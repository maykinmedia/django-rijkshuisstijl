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

    def parse_kwargs():
        _kwargs = kwargs
        for key in ('columns', 'column_labels', 'modifier_mapping', 'orderable_columns'):
            try:
                _kwargs[key] = [str.strip() for str in kwargs[key].split(',')]
            except (AttributeError, KeyError):
                pass
        return _kwargs

    def get_columns():
        _kwargs = parse_kwargs()
        columns = _kwargs['columns']

        _columns = []
        for column in columns:
            key_label = column.split(':')
            key = key_label[0].strip()

            try:
                label = key_label[1].strip()
            except IndexError:
                label = key

            _columns.append({'key': key, 'label': label})

        return _columns

    def get_object_list():
        object_list = kwargs.get('queryset', kwargs.get('object_list', []))
        add_modifier_class(object_list)
        return object_list

    def add_modifier_class(object_list):
        _kwargs = parse_kwargs()
        try:
            key = _kwargs['modifier_key']
            modifier_map = {}

            for mapping in kwargs['modifier_mapping']:
                mapping = mapping.split(':')
                modifier_map[mapping[0].strip()] = mapping[1].strip()

            for object in object_list:
                object_value = getattr(object, key)

                try:
                    modifier_value = modifier_map[object_value]
                    object.modifier_class = modifier_value
                except KeyError:
                    pass
        except KeyError:
            pass

    def get_modifier_column():
        return kwargs.get('modifier_column', kwargs.get('modifier_key', False))

    def get_orderable_column_keys():
        _kwargs = parse_kwargs()
        return [orderable_column.split(':')[0] for orderable_column in _kwargs.get('orderable_columns', [])]

    def get_ordering():
        _kwargs = parse_kwargs()
        request = context['request']
        orderable_columns = _kwargs.get('orderable_columns', [])

        ordering = {}
        for orderable_column in orderable_columns:
            querydict = QueryDict(request.GET.urlencode(), mutable=True)
            ordering_key = _kwargs.get('ordering_key', 'ordering')
            current_ordering = querydict.get(ordering_key, False)

            orderable_column_key_field = orderable_column.split(':')
            orderable_column_key = orderable_column_key_field[0].strip()

            try:
                orderable_column_field = orderable_column_key_field[1].strip()
            except IndexError:
                orderable_column_field = orderable_column_key

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


@register.inclusion_tag('rijkshuisstijl/components/textbox/textbox.html')
def textbox(**kwargs):
    return kwargs
