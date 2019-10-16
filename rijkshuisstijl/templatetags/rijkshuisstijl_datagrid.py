import re
from uuid import uuid4

from django import template
from django.http import QueryDict
from django.utils import formats
from django.utils.safestring import SafeText
from django.utils.translation import gettext_lazy as _

from .rijkshuisstijl_filters import get_attr_or_get
from .rijkshuisstijl_helpers import merge_config, parse_kwarg

register = template.Library()


@register.inclusion_tag('rijkshuisstijl/components/datagrid/datagrid.html', takes_context=True)
def datagrid(context, **kwargs):
    """
    Renders a datagrid.
    TODO: Documentation.
    :param context:
    :param kwargs:
    :return:
    """
    def get_id():
        return kwargs.get('id', 'datagrid-' + str(uuid4()))

    def get_columns():
        columns = parse_kwarg(kwargs, 'columns', [])

        try:
            # Convert dict to dict
            return [{'key': key, 'label': value} for key, value in columns.items()]
        except AttributeError:
            # Convert string to column dict
            if type(columns) == str or type(columns) == SafeText:
                columns = [{'key': columns, 'label': columns}]

            # Convert list to list of dicts
            elif type(columns) == list:
                processed_columns = []
                for column in columns:
                    # Already dict
                    if type(column) == dict:
                        processed_columns.append(column)
                    # Not dict
                    else:
                        processed_columns.append({'key': column, 'label': column})
                columns = processed_columns

            # Get label from model
            for column in columns:
                try:
                    context_queryset = context.get('queryset')
                    queryset = kwargs.get('queryset', context_queryset)
                    model = queryset.model

                    if column['key'] == '__str__':
                        column['label'] = model.__name__
                    else:
                        field = model._meta.get_field(column['key'])
                        column['label'] = field.verbose_name
                except:
                    pass

            return columns

    def get_form_buttons():
        form_actions = parse_kwarg(kwargs, 'form_buttons', {})
        try:
            return [{'name': key, 'label': value} for key, value in form_actions.items()]

        except AttributeError:
            return form_actions

    def get_object_list():
        context_object_list = context.get('object_list', [])
        context_queryset = context.get('queryset', context_object_list)
        object_list = kwargs.get('object_list', context_queryset)
        object_list = kwargs.get('queryset', object_list)

        for obj in object_list:
            add_display(obj)
            add_modifier_class(obj)
        return object_list

    def add_display(obj):
        for column in get_columns():
            key = column['key']
            fn = kwargs.get('get_{}_display'.format(key), None)
            if fn:
                setattr(obj, 'datagrid_display_{}'.format(key), fn(obj))

    def add_modifier_class(obj):
        try:
            key = parse_kwarg(kwargs, 'modifier_key', None)

            if not key:
                return

            modifier_map = parse_kwarg(kwargs, 'modifier_mapping', {})
            object_value = getattr(obj, key)

            for item_key, item_value in modifier_map.items():
                pattern = re.compile(item_key)
                if pattern.match(object_value):
                    obj.datagrid_modifier_class = item_value
        except KeyError:
            pass

    def get_modifier_column():
        return kwargs.get('modifier_column', kwargs.get('modifier_key', False))

    def get_orderable_column_keys():
        orderable_columns = parse_kwarg(kwargs, 'orderable_columns', {})
        try:
            return [key for key in orderable_columns.keys()]
        except AttributeError:
            return []

    def get_ordering():
        request = context['request']
        orderable_columns = parse_kwarg(kwargs, 'orderable_columns', {})
        order_by_index = kwargs.get('order_by_index', False)
        ordering = {}

        try:
            i = 1
            for orderable_column_key, orderable_column_field in orderable_columns.items():
                querydict = QueryDict(request.GET.urlencode(), mutable=True)
                ordering_key = parse_kwarg(kwargs, 'ordering_key', 'ordering')
                ordering_value = str(i) if order_by_index else orderable_column_field
                current_ordering = querydict.get(ordering_key, False)

                directions = {
                    'asc': ordering_value,
                    'desc': '-' + ordering_value
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

                i += 1
        except AttributeError:
            pass

        return ordering

    def add_paginator(ctx):
        paginator_ctx = ctx.copy()
        paginator_ctx['is_paginated'] = kwargs.get('is_paginated', context.get('is_paginated'))

        if paginator_ctx['is_paginated']:
            paginator_ctx['paginator'] = kwargs.get('paginator', context.get('paginator'))
            paginator_ctx['paginator_zero_index'] = kwargs.get('paginator_zero_index')
            paginator_ctx['page_key'] = kwargs.get('page_key', 'page')
            paginator_ctx['page_number'] = kwargs.get('page_number')
            paginator_ctx['page_obj'] = kwargs.get('page_obj', context.get('page_obj'))
            return paginator_ctx
        return paginator_ctx

    kwargs = merge_config(kwargs)
    ctx = kwargs.copy()

    # i18n
    ctx['label_result_count'] = parse_kwarg(kwargs, 'label_result_count', _('resultaten'))
    ctx['label_no_results'] = parse_kwarg(kwargs, 'label_no_results', _('Geen resultaten'))

    # kwargs
    ctx['class'] = kwargs.get('class', None)
    ctx['columns'] = get_columns()
    ctx['orderable_column_keys'] = get_orderable_column_keys()
    ctx['form_action'] = parse_kwarg(kwargs, 'form_action', '')
    ctx['form_buttons'] = get_form_buttons()
    ctx['form_checkbox_name'] = kwargs.get('form_checkbox_name', 'objects')
    ctx['form'] = parse_kwarg(kwargs, 'form', False) or bool(kwargs.get('form_action')) or bool(
        kwargs.get('form_buttons'))
    ctx['id'] = get_id()
    ctx['modifier_column'] = get_modifier_column()
    ctx['object_list'] = get_object_list()
    ctx['ordering'] = get_ordering()
    ctx['urlize'] = kwargs.get('urlize', True)
    ctx['title'] = kwargs.get('title', None)
    ctx['toolbar_position'] = kwargs.get('toolbar_position', 'top')
    ctx['url_reverse'] = kwargs.get('url_reverse', '')
    ctx['request'] = context['request']
    ctx = add_paginator(ctx)

    ctx['config'] = kwargs
    return ctx


@register.filter
def datagrid_label(obj, column_key):
    """
    Formats field in datagrid, supporting get_<column_key>_display() and and date_format().
    :param obj: (Model) Object containing key column_key.
    :param column_key key of field to get label for.
    :return: Formatted string.
    """
    try:
        return getattr(obj, 'datagrid_display_{}'.format(column_key))
    except:
        if column_key == '__str__':
            return str(obj)
        try:
            value = getattr(obj, column_key)
            return formats.date_format(value)
        except (AttributeError, TypeError):
            try:
                val = get_attr_or_get(obj, column_key)
                if val:
                    return val
            except:
                pass
            return obj
