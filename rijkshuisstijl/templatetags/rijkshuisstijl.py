import re
from collections import OrderedDict
from uuid import uuid4

from django import template
from django.http import QueryDict

register = template.Library()


@register.inclusion_tag('rijkshuisstijl/components/button/button.html')
def button(**kwargs):
    return kwargs


@register.inclusion_tag('rijkshuisstijl/components/filter/filter.html')
def dom_filter(**kwargs):
    return kwargs


@register.inclusion_tag('rijkshuisstijl/components/datagrid/datagrid.html', takes_context=True)
def datagrid(context, **kwargs):
    def get_id():
        return kwargs.get('id', 'datagrid-' + str(uuid4()))

    def get_columns():
        columns = parse_kwarg(kwargs, 'columns', {})
        return [{'key': key, 'label': value} for key, value in columns.items()]

    def get_object_list():
        object_list = kwargs.get('queryset', kwargs.get('object_list', []))
        add_modifier_class(object_list)
        return object_list

    def add_modifier_class(object_list):
        try:
            key = parse_kwarg(kwargs, 'modifier_key', None)

            if not key:
                return

            modifier_map = parse_kwarg(kwargs, 'modifier_mapping', {})

            for object in object_list:
                object_value = getattr(object, key)

                for item_key, item_value in modifier_map.items():
                    pattern = re.compile(item_key)
                    if pattern.match(object_value):
                        object.modifier_class = item_value
        except KeyError:
            pass

    def get_modifier_column():
        return kwargs.get('modifier_column', kwargs.get('modifier_key', False))

    def get_orderable_column_keys():
        return [key for key in parse_kwarg(kwargs, 'orderable_columns', {}).keys()]

    def get_ordering():
        request = context['request']
        orderable_columns = parse_kwarg(kwargs, 'orderable_columns', {})

        ordering = {}
        for orderable_column_key, orderable_column_field in orderable_columns.items():
            querydict = QueryDict(request.GET.urlencode(), mutable=True)
            ordering_key = parse_kwarg(kwargs, 'ordering_key', 'ordering')
            current_ordering = querydict.get(ordering_key, False)

            directions = {
                'asc': orderable_column_field,
                'desc': '-' + orderable_column_field
            }
            direction_url = directions['asc']
            direction = None

            if current_ordering == directions['asc']:
                direction = 'asc'
                direction_url = directions['desc']
            elif current_ordering == directions['desc']:
                direction = 'desc'
                direction_url = directions['asc']

            querydict[ordering_key] = direction_url
            ordering[orderable_column_key] = {
                'direction': direction,
                'url': '?' + querydict.urlencode()
            }
        return ordering

    kwargs['id'] = get_id()
    kwargs['columns'] = get_columns()
    kwargs['object_list'] = get_object_list()
    kwargs['modifier_column'] = get_modifier_column()
    kwargs['orderable_column_keys'] = get_orderable_column_keys()
    kwargs['ordering'] = get_ordering()
    kwargs['request'] = context['request']
    return kwargs


@register.inclusion_tag('rijkshuisstijl/components/button/link.html')
def button_link(**kwargs):
    return kwargs


@register.inclusion_tag('rijkshuisstijl/components/footer/footer.html', takes_context=True)
def footer(context, **kwargs):
    kwargs['request'] = context['request']
    return kwargs


@register.inclusion_tag('rijkshuisstijl/components/header/header.html')
def header(**kwargs):
    return kwargs


@register.inclusion_tag('rijkshuisstijl/components/icon/icon.html')
def icon(icon, **kwargs):
    kwargs['icon'] = icon
    return kwargs


@register.inclusion_tag('rijkshuisstijl/components/image/image.html')
def image(**kwargs):
    return kwargs


@register.inclusion_tag('rijkshuisstijl/components/key-value-table/key-value-table.html')
def key_value_table(**kwargs):
    return kwargs


@register.inclusion_tag('rijkshuisstijl/components/login-bar/login-bar.html', takes_context=True)
def login_bar(context, **kwargs):
    kwargs['request'] = context['request']
    return kwargs


@register.inclusion_tag('rijkshuisstijl/components/logo/logo.html')
def logo(**kwargs):
    return kwargs


@register.inclusion_tag('rijkshuisstijl/components/meta/meta-css.html')
def meta_css(**kwargs):
    return kwargs


@register.inclusion_tag('rijkshuisstijl/components/meta/meta-js.html')
def meta_js(**kwargs):
    return kwargs


@register.inclusion_tag('rijkshuisstijl/components/meta/meta-icons.html')
def meta_icons(**kwargs):
    return kwargs


@register.inclusion_tag('rijkshuisstijl/components/navigation-bar/navigation-bar.html', takes_context=True)
def navigation_bar(context, **kwargs):
    kwargs['request'] = context['request']
    return kwargs


@register.inclusion_tag('rijkshuisstijl/components/paginator/paginator.html', takes_context=True)
def paginator(context):
    return context


@register.inclusion_tag('rijkshuisstijl/components/search/search.html')
def search(**kwargs):
    return kwargs


@register.inclusion_tag('rijkshuisstijl/components/skiplink/skiplink.html')
def skiplink(**kwargs):
    return kwargs


@register.inclusion_tag('rijkshuisstijl/components/skiplink/skiplink-target.html')
def skiplink_target(**kwargs):
    return kwargs


@register.inclusion_tag('rijkshuisstijl/components/toolbar/toolbar.html')
def toolbar(*args, **kwargs):
    kwargs['items'] = kwargs.get('items', [])
    for arg in args:
        kwargs['items'].append(parse_arg(arg))
    return kwargs


@register.inclusion_tag('rijkshuisstijl/components/textbox/textbox.html')
def textbox(**kwargs):
    return kwargs


def parse_arg(arg, default=None):
    if not arg:
        return default

    if ',' in arg or ':' in arg:
        lst = [entry.strip() for entry in arg.split(',')]

        if ':' in arg or isinstance(default, dict):
            dct = OrderedDict()
            for value in lst:
                try:
                    key, val = value.split(':')
                except ValueError:
                    key = value
                    val = value
                dct[key] = val or key
            return dct
        return lst
    return arg


def parse_kwarg(kwargs, name, default=None):
    value = kwargs.get(name, None)
    return parse_arg(value, default)
