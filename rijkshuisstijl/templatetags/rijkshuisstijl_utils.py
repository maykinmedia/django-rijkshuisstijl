import datetime
import re
from collections.abc import Iterable

from django import template
from django.core.exceptions import FieldDoesNotExist
from django.db.models import Manager, Model, QuerySet
from django.db.models.base import ModelBase
from django.db.models.fields import Field
from django.templatetags.static import static
from django.utils.functional import Promise
from django.utils.html import format_html
from django.utils.safestring import mark_safe

from rijkshuisstijl.templatetags.rijkshuisstijl import register


def _get_recursed_field(model_class, field_lookup):
    """
    :param model_class: a Django model class.
    :param field_lookup: a str:  Django query filter like field lookup.
    :return: typically, a Django model field, however lookups of class methods
    are supported plus the resolved model_class
    """
    field_fragments = field_lookup.split("__")
    name = field_fragments[0]

    try:
        field = model_class._meta.get_field(name)
    except FieldDoesNotExist:
        return getattr(model_class, name, ""), model_class

    while field_fragments:
        lookup = field_fragments.pop()

        try:
            remote_field = model_class._meta.get_field(field_lookup)
        except FieldDoesNotExist:
            break

        if remote_field.auto_created:
            remote_field = remote_field.remote_field
        else:
            break

        field = remote_field

        if not field.many_to_one and not field.one_to_one:
            model_class = field.model
        else:
            model_class = field.related_model

    return field, model_class


def _get_model(obj):
    """
    :param obj: Anything that resolves into a model, typically a model, a model
    instance or a QuerySet.
    :return: class: A Django model class when found or None
    """
    if isinstance(obj, QuerySet):
        return obj.model
    elif isinstance(obj, Model):
        return obj._meta.model
    elif isinstance(obj, ModelBase):
        return obj

    return None


@register.filter()
def get_recursed_field_label(obj, field_lookup):
    """
    Default way to go to resolve a (related) label with obj as input.

    :param obj: Anything that resolves into a model, typically a model, a model
    instance or a QuerySet.
    :param field_lookup: a str:  Django like field lookup.
    :return: str: resolved label name
    """
    model_class = _get_model(obj)

    if not model_class:
        return field_lookup

    field, model_class = _get_recursed_field(model_class, field_lookup)
    return get_field_label(model_class, field)


def _get_field_label_fallback(field_lookup):
    """
    :param field_lookup: string which whoms label needs to be retrieved
    :return: str: a formatted version of field_lookup
    """
    if field_lookup is not str:
        return str(field_lookup)

    label = field.replace("get_", "", 1)
    label = label.replace("_", "")
    label = label.replace("-", "")
    return label


@register.filter
def get_field_label(model_or_instance, field_or_field_name):
    """
    :param model_or_instance: Either a model or a Model instance.
    :param field_or_field_name: Typically, a Django model field or a field name,
    however lookups of class methods are supported.
    :return: str: label taken from field_or_field_name
    """
    function = field_or_field_name if callable(field_or_field_name) else False

    if function and isinstance(model_or_instance, Model):
        return function(model_or_instance)

    model_class = _get_model(model_or_instance)

    if field_or_field_name is str and field_or_field_name == "__str__":
        return model_class._meta.verbose_name

    if field_or_field_name is str:
        value = getattr(field_or_field_name, model_class, "")

        if isinstance(value, property):
            return value

    if isinstance(field_or_field_name, Field):
        field = field_or_field_name
    else:
        try:
            field = model_class._meta.get_field(field_or_field_name)
        except FieldDoesNotExist:
            return _get_field_label_fallback(field_or_field_name)

    # ManyToOneRel fields don't have a verbose_name field.
    # _verbose_name is used as override for the default created verbose_name
    # see Django Field class.
    if hasattr(field, "_verbose_name") and field._verbose_name:
        return field._verbose_name

    if field.related_model:
        plural_name = field.related_model._meta.verbose_name_plural
        verbose_name = field.related_model._meta.verbose_name

        return plural_name if plural_name else verbose_name

    return _get_field_label_fallback(field.name)


@register.filter
def get_recursed_field_value(obj, field=""):
    """
    Finds a field value in an object by recursing through related fields.
    :param obj: A model instance.
    :param field: A field, possibly on a related instance. Example: "author__first_name".
    :return: str
    """
    fields = field.split("__")
    while fields:
        field = fields.pop(0)
        if field:
            try:
                obj = getattr(obj, field)
            except AttributeError:
                return ""

    return obj


@register.filter
def format_value(obj, field="", empty_label="-"):
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
    if field == "__str__":
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
        return val

    # Check for Model instance.
    if isinstance(val, Model):
        try:
            url = val.get_absolute_url()
            return format_html(f'<a class="link" href="{url}">{val}</a>')
        except AttributeError:
            pass

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
        except Exception as e:
            context.push({"exception": e})
            return self.nodelist_except.render(context)
