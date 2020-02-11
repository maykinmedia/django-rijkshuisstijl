import re
from collections.abc import Iterable

from django import template
from django.core.exceptions import FieldDoesNotExist
from django.db.models import Field
from django.utils import formats

from rijkshuisstijl.templatetags.rijkshuisstijl import register
from rijkshuisstijl.templatetags.rijkshuisstijl_helpers import get_recursed_field_value


@register.filter
def format_value(obj, field):
    """
    Formats field in obj. If obj is a model instance it supports
    get_<column_key>_display() and and date_format()
    :param obj: (Model) Object containing key column_key.
    :param field key of field to get label for.
    :return: Formatted string.
    """

    # Check for rh_display_<column> on object.
    datagrid_display = "rh_display_{}".format(field)
    if hasattr(obj, datagrid_display):
        return getattr(obj, datagrid_display)

    # Check for get_<column>_display on object.
    model_display = "get_{}_display".format(field)
    if hasattr(obj, model_display):
        display = getattr(obj, model_display)
        if callable(display):
            return display()

    # Check for __str__.
    if field is "__str__":
        return str(obj)

    # Check for list.
    if type(obj) in (list, dict,):
        return obj.get(field)

    # Check for (related) value.
    val = get_recursed_field_value(obj, field)

    try:
        model_field = obj._meta.get_field(field)

        if not isinstance(model_field, Field):
            # field is a related manager
            model_field = model_field.field
    except FieldDoesNotExist:
        model_field = None

    if model_field and model_field.is_relation:
        if hasattr(val, "all"):
            return ", ".join([str(instance) for instance in val.all()])
        return str(val)

    if field.endswith("_set"):
        possible_related_field = field.replace("_set", "")

        try:
            related_manager = obj._meta.get_field(possible_related_field)
        except (FieldDoesNotExist, AttributeError) as e:
            related_manager = None

        if related_manager:
            return ", ".join([str(instance) for instance in val.all()])

    # Check for iterable.
    if isinstance(val, Iterable) and not isinstance(val, str):
        return ", ".join(val)

    # Check for callable.
    if callable(val):
        return val()

    if val:
        try:
            # Try to apply date formatting.
            return formats.date_format(val)
        except AttributeError:
            return val

    # Return empty string
    return ""


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
