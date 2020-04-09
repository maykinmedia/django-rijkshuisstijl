import datetime
import re
from collections.abc import Iterable

from django import template
from django.core.exceptions import FieldDoesNotExist
from django.db.models import Manager, QuerySet
from django.templatetags.static import static
from django.utils import formats
from django.utils.formats import localize
from django.utils.functional import Promise
from django.utils.safestring import mark_safe

from rijkshuisstijl.templatetags.rijkshuisstijl import register
from rijkshuisstijl.templatetags.rijkshuisstijl_helpers import get_model


@register.filter
def get_field_label(obj, field):
    """
    Returns the label for a field based preferably based on obj's model.
    Falls back to replacing dashes and underscores with " ".
    If field is a callable. It's called with obj as parameter and the resulting value is returned.
    :param obj: A model instance or a QuerySet.
    :param field: A string indicating the field to get the label for.
    :return:
    """

    # If field is a callable. It's called with obj as parameter and the resulting value is returned.
    if callable(field):
        return field(obj)

    try:
        model = get_model(obj)
        field_name = str(getattr(field, "name", field))

        # If column key is "__str__", use model name as label.
        if field_name == "__str__" and model:
            return model._meta.verbose_name

        # If model field can be found, use it's verbose name as label.
        else:
            model_field = model._meta.get_field(field_name)

            if hasattr(model_field, "verbose_name"):
                return model_field.verbose_name
            elif model_field.one_to_many:
                plural_name = model_field.related_model._meta.verbose_name_plural
                verbose_name = model_field.related_model._meta.verbose_name
                return plural_name if plural_name else verbose_name

    # If label cannot be found, fall back to replacing dashes and underscores with " ".
    except:
        pass

    regex = re.compile("[_-]+")
    try:
        return re.sub(regex, " ", field)
    except TypeError:
        return field


@register.filter()
def get_recursed_field(obj, field_lookup):
    """
    Finds a field in an object by recursing through related fields.
    :param obj: A model instance or a QuerySet.
    :param field: A field, possibly on a related instance. Example: "author__first_name".
    :return: Field
    """
    try:
        model = obj._meta.model
    except AttributeError:
        model = obj.model

    field_split = field_lookup.split("__")
    field_name = field_split[0]
    field = model._meta.get_field(field_name)

    while field_split:
        field_lookup = field_split.pop(0)

        try:
            remote_field = model._meta.get_field(field_lookup).remote_field

            # Not a remote field, break.
            if remote_field is None:
                break

            field = remote_field
            model = field.model

        except (AttributeError, FieldDoesNotExist):
            break
    return field


@register.filter()
def get_recursed_field_label(obj, field_lookup):
    """
    Finds a field name in an object by recursing through related fields.
    :param obj: A model instance or a QuerySet.
    :param field: A field, possibly on a related instance. Example: "author__first_name".
    :return: str
    """
    field = get_recursed_field(obj, field_lookup)
    if field.remote_field:
        field = field.remote_field
    return get_field_label(field.model, field)


@register.filter
def get_recursed_field_value(obj, field):
    """
    Finds a field value in an object by recursing through related fields.
    :param obj: A model instance.
    :param field: A field, possibly on a related instance. Example: "author__first_name".
    :return: str
    """
    fields = field.split("__")

    while fields:
        field = fields.pop(0)
        try:
            obj = getattr(obj, field)
        except AttributeError:
            return ""

    return obj


@register.filter
def format_value(obj, field, empty_label="-"):
    """
    Formats field in obj. If obj is a model instance it supports
    get_<column_key>_display() and and date_format()
    :param obj: (Model) Object containing key column_key.
    :param field: key of field to get label for.
    :param empty_label: Label to show when no value is found.
    :return: str
    """

    # Check for rh_display_<column> on object.
    datagrid_display = "rh_display_{}".format(field)
    if hasattr(obj, datagrid_display):
        return getattr(obj, datagrid_display, empty_label)

    # Check for get_<column>_display on object.
    model_display = "get_{}_display".format(field)
    if hasattr(obj, model_display):
        display = getattr(obj, model_display)
        if callable(display):
            return display() or empty_label

    # Check for __str__.
    if field is "__str__":
        return str(obj) or empty_label

    # Resolve value.
    val = get_recursed_field_value(obj, field)

    while callable(val):
        try:
            val = val()
        except TypeError:
            break

    # Check for None.
    if val is None:
        return empty_label

    # Check for boolean.
    if type(val) is bool:
        src = static("rijkshuisstijl/lib/boolean/false.png")

        if val:
            src = static("rijkshuisstijl/lib/boolean/true.png")

        return mark_safe(f'<span><img class="boolean" alt="{val}" src="{src}"></span>')

    # Check for str.
    if isinstance(val, str) or isinstance(val, Promise):
        return val or empty_label

    # Check for Manager (assume None).
    if isinstance(val, Manager):
        try:
            val = val.all()
        except AttributeError:
            return empty_label

    # Check for Iterable, QuerySet.
    if (
        not isinstance(val, str)
        and not isinstance(val, Promise)
        and (isinstance(val, Iterable) or isinstance(val, QuerySet))
    ):
        object_list = [str(obj) for obj in val]
        return ", ".join(object_list) or empty_label

    # Check for date(time).
    if type(val) in [datetime.datetime, datetime.date]:
        return localize(val)

    # Fallback
    return val or empty_label


class SingleLineNode(template.Node):
    def __init__(self, nodelist):
        self.nodelist = nodelist

    def render(self, context):
        content = self.nodelist.render(context)
        # singleline = content.replace('\n', '')
        return re.sub(r"\s+", " ", content)


@register.tag("singleline")
def singleline(parser, token):
    """
    Puts content on a single line.
    Intended as replacement for {% spaceless %} compressing content within tags.

    Example:

        {% singleline %}

        <input class="input"
               name="foo"
               value="bar">

        {% endsingleline %}
    """
    nodelist = parser.parse(("endsingleline",))
    parser.delete_first_token()
    return SingleLineNode(nodelist)


@register.tag("try")
def tryexcept(parser, token):
    """
    Creates try/except block within a template.

    Example:

        {% try %}
            {% foo %}
        {% except %}
            Something went wrong...
        {% endtry %}
    """
    nodelist_try = parser.parse(("except",))
    parser.next_token()
    nodelist_except = parser.parse(("endtry",))
    parser.delete_first_token()
    return TryNode(nodelist_try, nodelist_except)


class TryNode(template.Node):
    def __init__(self, nodelist_try, nodelist_except):
        self.nodelist_try = nodelist_try
        self.nodelist_except = nodelist_except

    def render(self, context):
        try:
            return self.nodelist_try.render(context)
        except:
            return self.nodelist_except.render(context)
