import re

from django.core.paginator import Paginator
from django.forms import formset_factory, modelformset_factory
from django.http import HttpResponseRedirect, QueryDict
from django.utils.dateparse import parse_date
from django.utils.translation import gettext_lazy as _

from rijkshuisstijl.templatetags.rijkshuisstijl import register
from rijkshuisstijl.templatetags.rijkshuisstijl_utils import (
    get_field_label,
    get_recursed_field_value,
)

from .rijkshuisstijl_helpers import (
    create_list_of_dict,
    get_id,
    merge_config,
    parse_kwarg,
)


@register.inclusion_tag("rijkshuisstijl/components/datagrid/datagrid.html", takes_context=True)
def datagrid(context, **kwargs):
    """
    Renders a table like component with support for filtering, ordering and  paginating. It's main use if to display
    data from a listview.

    .. code-block:: html

        {% datagrid config=config %}
        {% datagrid option1='foo' option2='bar' %}

    Available options
    =================

    Showing data
    ------------

    Data is shown based on a internal "object" list which can be populated by either a "queryset" or an
    "object_list option. Columns are specified by a "columns" option which may define an additional label to show in
    the table header. Columns match fields in the objects in the internal object_list.

    - object_list: Optional, A list containing the object_list to show. if possible, use queryset instead.
      The internally used object_list is obtained by looking for these values in order:

    .. code-block:: python

        kwargs['queryset']
        kwargs['object_list']
        context['queryset']
        context['object_list']

    - queryset: Optional, A queryset containing the objects to show.

    - columns: Required, a dict or a list defining which columns/values to show for each object in object_list or
      queryset.

      - If a dict is passed, each key will represent a field in an object to obtain the data from and each value
        will represent the label to use for the column heading.
        Example: {'author': 'Written by', 'title': 'Title'}

      - If a list is passed, each item will represent a field in an object to obtain the data from and will also
        represent the label to use for the column heading.
        Example: ['author', 'title']


    Filtering
    ---------

    If an (unpaginated) queryset is passed or obtained from the context, it can be filtered using controls.
    Pagination provided by the datagrid itself can be used in combination with filtering. The queryset's model is
    inspected to determine the type of the filters and optionally the choices.

    - filterable_columns: Optional, a list defining which columns should be filterable.

    DOM filter
    ----------

    Next to queryset filters, a DOM filter can be added to the top header allowing real time searching within the page.
    See: rijkshuisstijl.templatetags.rijkshuisstijl_extras.dom_filter.

    - dom_filter: Optional, if True, adds a DOM filter to the top header.


    Grouping
    --------

    Objects can be grouped together within the datagrid by specifying the "groups" options. This resolves the value of
    "lookup" for each shown object and tests it against each "value" in a dict in "groups", a subtitle for each group is
    rendered showing the value of "label" within that same dict.

    - groups: Optional, a dict ("lookup", "values"). Lookup should be a string pointing to a (related) field. Groups
      should be a list_of_dict ("value", "label"). The result the lookup for each object is compared to the value of
      each group.


    Ordering
    --------

    An interface for ordering can be creating by defining the fields that should be made orderable. Orderable
    columns are specified by the "orderable_columns" option which may define a field lookup which defaults to the
    field. Inverted field lookups are proceeded with a dash "-" character and set to the GET parameter specified by
    the "ordering_key" setting.

    - order: Optional, if True, order queryset, if False rely on view/context to order queryset.
    - orderable_columns: Optional, a dict or a list defining which columns should be orderable.

      - If a dict is passed each key will map to a field (the key) in columns, each value will be used to describe
        a field lookup.
        Example: {"author": "author__first_name"}

      - If a list is passed each value will map to a field (the key) in columns and will also be used to describe
        a field lookup.
        Example: ['author', 'title']

      - Additionally, a dict ("key", ["lookup"]) can be passed within a list.
        a field lookup.
        Example: ['{"key": "author", "lookup": "author__first_name"}', 'title']

    - ordering_key: Optional, describes which query parameter should be used in hyperlinks
    (set on the table captions) to indicate which order the view should provide, defaults to "ordering".


    Pagination
    ----------

    Data can be paginated if needed. Pagination can either be performed by the datagrid itself, or an already
    available (Django) paginator may be used (since we need to support already paginated object lists).

    Paginate un-paginated object_list
    ---------------------------------

    - paginate: Optional, if True, paginate object_list (or queryset).
    - paginate_by: Optional, amount of results per page, defaults to 100.
    - page_key: Optional, The GET parameter to use for the page, defaults to 'page'.

    Use existing paginator
    ----------------------

    An existing Django Paginator instance can be used. Pagination details may be obtained from the context if not
    explicitly set.

    - is_paginated: Optional, if True, paginate based on paginator configuration, may be obtained from context.
    - paginator: Optional, A Django Paginator instance, may be obtained from context.
    - page_obj: Optional, The paginator page object, may be obtained from context.
    - page_number: Optional, The current page number.
    - page_key: Optional, The GET parameter to use for the page, defaults to 'page'.


    Custom presentation (get_<field>_display)
    -----------------------------------------

    - get_<field>_display: Optional, allows a callable to be used to generate a custom cell display value. Replace
      <field> with a key which will map to a field (a key in columns) and set a callable as it's value.

    The callable will receive the row's object and should return SafeText.
    Example: `lambda object: mark_safe(<a href="{}">{}</a>.format(object.author.get_absolute_url, object.author))`


    Manipulating data (form)
    ------------------------

    A form can be generated POSTing data to the url specified by the "form_action" option. When a form is active
    each row gets a checkbox input with a name specified by the "form_checkbox_name" option. Various actions can be
    defined by the "form_buttons" option which are placed either in the top, bottom or at both position based on the
    value of the "toolbar_position" option.

    - form: Optional, if True, adds a form to the datagrid, useful for allowing user manipulations on the dataset.
      Defaults to false, unless "form_action" or "form_buttons" is set.

    - form_action: Optional, specifies the url to submit form actions to. If set, form will default to True.

    - form_buttons: Optional, a list_of_dict (label, [href], [icon], [icon_src] [name], [target], [title]) defining
      which buttons to create (see rijkshuisstijl_form.button). The name attribute of the buttons should be used to
      specify the performed action.
      example: [{'name': 'delete', 'label': 'delete' 'class': 'button--danger'}]

    - form_method: Optional, method to use for the form, defaults to "POST".

    - form_select: Optional, If set (dict, at least "name"), shows a select with actions (comparable to form_buttons).
      Requires form_options to be set as well. The name attribute should be used to specify the performed action.

    - form_options: Optional, a list_of_dict (label, value) defining which options to create within the select.

    - form_checkbox_name: Optional, specifies the name for each checkbox input for an object in the table. This
      should be used for determining which objects should be manipulated by the performed action.

    - form_select_all_position, Specifies the position of the select all checkbox (if applicable).

    - toolbar_position: Optional, a list_of_dict (value, label) defining
      toolbar containing the buttons specified by form_buttons.

    Color coded rows
    ----------------

    Rows can be configured to show a color coded border and a colored cell value based on the value of a certain
    field. The field to look for is defined by the "modifier_key" option if this is any different than the column
    key it should color the cell for, the column can be specified by the "modifier_column" options. This defaults
    to the value of the "modifier_key" option. The field value is matched against a mapping (specified by the
    "modifier_mapping" options) to define the color. The value should contain the value in the mapping.

    - modifier_key Optional, a string defining the field in an object to get the value to match for.
    - modifier_column Optional, a string defining the column key to apply the colored styling for.
    - modifier_mapping, Optional, a dict containing a key which possibly partially matches an object's field value
      and which value is one of the supported colors.
      Example: [{'1984': 'purple'}]

    The supported colors are:

    - purple
    - purple-shade-1
    - purple-shade-2
    - violet
    - violet-shade-1
    - violet-shade-2
    - ruby
    - ruby-shade-1
    - ruby-shade-2
    - pink
    - pink-shade-1
    - pink-shade-2
    - red
    - red-shade-1
    - red-shade-2
    - orange
    - orange-shade-1
    - orange-shade-2
    - dark-yellow
    - dark-yellow-shade-1
    - dark-yellow-shade-2
    - yellow
    - yellow-shade-1
    - yellow-shade-2
    - dark-brown
    - dark-brown-shade-1
    - dark-brown-shade-2
    - brown
    - brown-shade-1
    - brown-shade-2
    - dark-green
    - dark-green-shade-1
    - dark-green-shade-2
    - green
    - green-shade-1
    - green-shade-2
    - moss-green
    - moss-green-shade-1
    - moss-green-shade-2
    - mint-green
    - mint-green-shade-1
    - mint-green-shade-2
    - dark-blue
    - dark-blue-shade-1
    - dark-blue-shade-2
    - heaven-blue
    - heaven-blue-shade-1
    - heaven-blue-shade-2
    - light-blue
    - light-blue-shade-1
    - light-blue-shade-2


    Additional options
    ------------------

    - class: Optional, a string with additional CSS classes.
    - id: Optional, a string specifying the id, defaults to a generated uuid4 string.
    - title: Optional, if set, a title will be shown above the datagrid.
    - url_reverse: Optional, A URL name to reverse using the object's 'pk' attribute as one and only attribute,
      creates hyperlinks in the first cell. If no url_reverse if passed get_absolute_url is tried in order to find
      a url.
    - urlize: Optional, if True (default) cell values are passed to "urlize" template filter, automatically creating
      hyperlinks if applicable in every cell.

    :param context:
    :param kwargs:
    """

    # Keep a quick cache single use _cache dict to speed things up a bit, we might need to optimize this later.
    _cache = {}

    def get_columns():
        """
        Gets the columns to show based on kwargs['columns']. If no label is provided an attempt is made to create it
        based on the model or a simple replacement of dashes and underscores.
        :return: A list_of_dict where each dict contains "key" and "label" keys.
        """
        if _cache.get("get_columns"):
            return _cache.get("get_columns")

        columns = parse_kwarg(kwargs, "columns", [])
        columns = create_list_of_dict(columns, "key", "fallback_label")

        # Get column label.
        for column in columns:
            context_queryset = context.get("queryset")
            queryset = kwargs.get("queryset", context_queryset)

            if queryset and not column.get(
                "label"
            ):  # If queryset present, resolve label via model.
                column["label"] = get_field_label(queryset, column["key"])
            if not queryset and not column.get(
                "label"
            ):  # If queryset not present, fall back to fallback label.
                column["label"] = get_field_label(None, column.get("fallback_label"))

        _cache["get_columns"] = columns
        return columns

    def get_object_list(refresh=False):
        """
        Looks for the object_list to use based on the presence of these variables in order:

            1) kwargs['queryset']
            2) kwargs['object_list']
            3) context['queryset']
            4) context['object_list']

        Queryset filtering is applied if required.
        Ordering is applied if required.
        add_display() and add_modifier_class() are called for every object in the found object_list.
        :return: A list of objects to show data for.
        """
        if _cache.get("get_object_list") and not refresh:
            return _cache.get("get_object_list")

        # Get object list.
        context_object_list = context.get("object_list", [])
        context_queryset = context.get("queryset", context_object_list)
        object_list = kwargs.get("object_list", context_queryset)
        object_list = kwargs.get("queryset", object_list)

        if hasattr(object_list, "model") and refresh:
            object_list = object_list.all()

        # Filtering
        filters = get_filters()
        if filters and hasattr(object_list, "filter") and callable(object_list.filter):
            try:
                active_filters = [
                    active_filter for active_filter in filters if active_filter.get("value")
                ]
                for active_filter in active_filters:
                    filter_key = active_filter.get("filter_key")
                    value = active_filter.get("value")
                    type = active_filter.get("type")

                    if type is "DateTimeField":
                        value = parse_date(value)
                        filter_kwargs = {
                            filter_key + "__year": value.year,
                            filter_key + "__month": value.month,
                            filter_key + "__day": value.day,
                        }
                    elif active_filter.get("is_relation"):
                        filter_kwargs = {filter_key: value}
                    else:
                        filter_kwargs = {filter_key + "__icontains": value}
                    object_list = object_list.filter(**filter_kwargs)
            except:
                object_list = object_list.none()

        # Ordering
        order = kwargs.get("order")
        if order and hasattr(object_list, "order_by") and callable(object_list.order_by):
            order_by = get_ordering()

            if order_by:
                object_list = object_list.order_by(order_by)

        # Pagination
        object_list = add_paginator(object_list)

        _cache["get_object_list"] = object_list
        return object_list

    def get_modifier_column():
        """
        Returns the key of the column to colorize the value of is a modifier configuration is set. Defaults to the value
        of the modifier_key option.
        :return: A string othe modifier column or False.
        """
        return kwargs.get("modifier_column", kwargs.get("modifier_key", False))

    def get_filters():
        """
        Returns a list_of_dict for filter configuration, each dict (if present) contains:

        - filter_key: matching a column.
        - type: matching the field class name.
        - choices: a tuple containing choice tuples. Used to provide options/suggestions for filter.
        - value: The value of the filter.

        :return: list_of_dict.
        """
        if _cache.get("get_filters"):
            return _cache.get("get_filters")

        filterable_columns = parse_kwarg(kwargs, "filterable_columns", [])
        filterable_columns = create_list_of_dict(filterable_columns)

        context_queryset = context.get("queryset")
        queryset = kwargs.get("queryset", context_queryset)

        if not queryset:  # Filtering is only supported on querysets.
            _cache["get_filters"] = {}
            return {}

        for filterable_column in filterable_columns:
            if not "filter_key" in filterable_column:
                filterable_column["filter_key"] = filterable_column.get("key")

            field_key = filterable_column.get("key", "")
            field_name = field_key.split("__")[0]
            field = queryset.model._meta.get_field(field_name)

            if not "type" in filterable_column:
                filterable_column["type"] = type(field).__name__

            if not "choices" in filterable_column:
                choices = getattr(field, "choices", [])

                if filterable_column.get("type") == "BooleanField":
                    choices = ((True, _("waar")), (False, _("onwaar")))

                if field.is_relation:
                    filterable_column["is_relation"] = field.is_relation

                    if "__" in field_key:
                        remote_field_name = field_key.split("__")[-1]
                        choices = [
                            (value, value)
                            for value in field.remote_field.model.objects.values_list(
                                remote_field_name, flat=True
                            )
                        ]
                    else:
                        choices = field.remote_field.model.objects.all()

                if choices:
                    filterable_column["choices"] = [("", "---------")] + list(choices)

            request = context.get("request")
            filter_key = filterable_column["filter_key"]
            filterable_column["value"] = request.GET.get(filter_key)

        _cache["get_filters"] = filterable_columns
        return filterable_columns

    def get_groups():
        """
        Splits object_list into one or more groups, returns a dict for each group containing:

        - id: a unique id identifying this group.
        - default: whether the group is the default groups (no groups were set).
        - label: the string represenation of a group, (rendered as subtitle).
        - lookup: the field on each object to lookup.
        - value: the resulting value of lookup required to match object to this group.
        - object_list: the objects matching this group.

        :return: list_of_dict.
        """
        groups = parse_kwarg(kwargs, "groups")
        object_list = get_object_list()

        if not groups:
            return [
                {
                    "id": get_id({}, "datagrid-group"),
                    "default": True,
                    "label": None,
                    "lookup": None,
                    "value": None,
                    "object_list": object_list,
                }
            ]

        lookup = groups.get("lookup")
        group_defs = groups.get("groups")
        group_defs = create_list_of_dict(group_defs, "value", "label")

        groups = [
            {
                "id": get_id({}, "datagrid-group"),
                "default": False,
                "label": group_def.get("label"),
                "lookup": lookup,
                "value": group_def.get("value"),
                "object_list": [
                    object
                    for object in object_list
                    if get_recursed_field_value(object, lookup) == group_def.get("value")
                ],
            }
            for group_def in group_defs
        ]
        return groups

    def get_ordering():
        """
        Return the field to use for ordering the queryset.
        Only allows ordering by dict keys found in the orderable_columns option.
        :return: string or None
        """
        if _cache.get("get_ordering"):
            return _cache.get("get_ordering")

        request = context["request"]
        ordering_key = get_ordering_key()
        ordering = request.GET.get(ordering_key)
        orderable_columns = get_orderable_columns()

        result = None
        if ordering and ordering.replace("-", "") in [c["lookup"] for c in orderable_columns]:
            result = ordering
        elif ordering:
            print(ordering, "is invalid, allowed columns are", orderable_columns)
        _cache["get_ordering"] = result
        return result

    def get_ordering_key():
        """
        Returns the query parameter to use for ordering.
        :return: string
        """
        return parse_kwarg(kwargs, "ordering_key", "ordering")

    def get_orderable_columns():
        """
        Returns the the key and lookup field for every column which should be made ordrable..
        :return: A list_of_dict where each dict contains at least "key" and "lookup" keys.
        """
        if _cache.get("get_orderable_columns"):
            return _cache.get("get_orderable_columns")

        orderable_columns = parse_kwarg(kwargs, "orderable_columns", {})
        orderable_columns_list_of_dict = []

        """
          - If a dict is passed each key will map to a field (the key) in columns, each value will be used to describe
            a field lookup.
            Example: {"author": "author__first_name"}
        """
        if type(orderable_columns) is dict:
            orderable_columns_list_of_dict = [
                {"key": item[0], "lookup": item[1]} for item in orderable_columns.items()
            ]

        """
          - If a list is passed each value will map to a field (the key) in columns and will also be used to describe
            a field lookup
            Example: ['author', 'title']
        """
        if type(orderable_columns) is list or type(orderable_columns) is tuple:
            for orderable_column in orderable_columns:
                if type(orderable_column) is dict:
                    """
                    Edge case: A dict is found within the list, this is also supported.
                    """
                    key = orderable_column["key"]
                    lookup = orderable_column.get("lookup", key)
                    orderable_column_dict = {"key": key, "lookup": lookup}
                else:
                    orderable_column_dict = {"key": orderable_column, "lookup": orderable_column}

                orderable_columns_list_of_dict.append(orderable_column_dict)

        _cache["get_orderable_columns"] = orderable_columns_list_of_dict
        return orderable_columns_list_of_dict

    def get_ordering_dict():
        """
        Returns a dict containing a dict with ordering information (direction, url) for every orderable column.
        :return: dict
        """
        request = context["request"]
        order_by_index = kwargs.get("order_by_index", False)
        ordering_dict = {}

        try:
            i = 1
            for orderable_column in get_orderable_columns():
                orderable_column_key = orderable_column["key"]
                orderable_column_lookup = orderable_column["lookup"]

                querydict = QueryDict(request.GET.urlencode(), mutable=True)
                ordering_key = get_ordering_key()
                ordering_value = str(i) if order_by_index else orderable_column_lookup
                current_ordering = get_ordering()

                directions = {
                    "asc": ordering_value.replace("-", ""),
                    "desc": "-" + ordering_value.replace("-", ""),
                }

                direction_url = directions["asc"]
                direction = None

                if current_ordering == directions["asc"]:
                    direction = "asc"
                    direction_url = directions["desc"]
                elif current_ordering == directions["desc"]:
                    direction = "desc"
                    direction_url = directions["asc"]

                querydict[ordering_key] = direction_url
                ordering_dict[orderable_column_key] = {
                    "direction": direction,
                    "url": "?" + querydict.urlencode(),
                }

                i += 1
        except AttributeError:
            pass
        return ordering_dict

    def get_form_buttons():
        """
        Gets the buttons to use for the form based on kwargs['form_buttons'].
        :return: A list_of_dict where each dict contains at least "name" and "label" keys.
        """
        form_buttons = parse_kwarg(kwargs, "form_buttons", {})

        # Convert dict to list_of_dict
        try:
            return [{"name": key, "label": value} for key, value in form_buttons.items()]
        except AttributeError:
            return form_buttons

    def get_form_select():
        """
        Gets the select to use for the form based on kwargs['form_select'] and form_options.
        :return: A dict with at least "name" and "options" keys, options is a list_of_dict.
        """
        form_select = parse_kwarg(kwargs, "form_select", None)
        if form_select:
            form_options = parse_kwarg(kwargs, "form_options", [])
            form_select["choices"] = [tuple(d.values()) for d in form_options]
            return form_select

        return None

    def get_formset():
        """
        TODO:
        :return: BaseModelFormSet
        """
        request = context.get("request")
        form_class = config.get("form_class")
        queryset = get_object_list()

        if not (hasattr(queryset, "model") and form_class and queryset):
            return []

        model = queryset.model
        ModelFormSet = modelformset_factory(model, form_class)

        if request.method == "POST":
            formset = ModelFormSet(request.POST)

            if formset.is_valid():
                formset.save()
                return ModelFormSet(queryset=queryset.all())
            else:
                return formset

        return ModelFormSet(queryset=queryset)

    def add_paginator(object_list):
        """
        Return datagrid_context with added paginator configuration.
        :param object_list:
        """
        config["is_paginated"] = config.get("is_paginated", context.get("is_paginated"))

        if config.get("paginate"):
            """
            Paginate object_list.
            """
            request = context["request"]
            paginate_by = config.get("paginate_by", 100)
            paginator = Paginator(object_list, paginate_by)
            page_key = config.get("page_key", "page")
            page_number = request.GET.get(page_key, 1)

            if str(page_number).upper() == "LAST":
                page_number = paginator.num_pages

            page_obj = paginator.get_page(page_number)
            object_list = page_obj.object_list

            config["is_paginated"] = True
            config["paginator"] = paginator
            config["page_key"] = page_key
            config["page_number"] = page_number
            config["page_obj"] = page_obj
            config["object_list"] = object_list

        if config.get("is_paginated"):
            """
            Rely on view/context for pagination.
            """
            config["paginator"] = config.get("paginator", context.get("paginator"))
            config["page_key"] = config.get("page_key", "page")
            config["page_number"] = config.get("page_number")
            config["page_obj"] = config.get("page_obj", context.get("page_obj"))

        return object_list

    def add_object_attributes(datagrid_context):
        """
        Calls add_display(obj) and add_modifier_class(obj) for every obj in (paginated) object_list.
        :param datagrid_context:
        :return: datagrid_context
        """
        object_list = datagrid_context.get("object_list", [])

        for obj in object_list:
            add_display(obj)
            add_modifier_class(obj)
        return datagrid_context

    def add_display(obj):
        """
        If a get_<field>_display callable is set, add the evaluated result to the rh_display_<field> field on the
        object passed to obj.
        :param obj:
        """
        for column in get_columns():
            key = column["key"]
            fn = kwargs.get("get_{}_display".format(key), None)
            if fn:
                setattr(obj, "rh_display_{}".format(key), fn(obj))

    def add_modifier_class(obj):
        """
        If a modifier configuration is set, add the result color as datagrid_modifier_class to the object passed to
        obj.
        :param obj:
        """
        try:
            key = parse_kwarg(kwargs, "modifier_key", None)

            if not key:
                return

            modifier_map = parse_kwarg(kwargs, "modifier_mapping", {})
            object_value = getattr(obj, key)

            for item_key, item_value in modifier_map.items():
                pattern = re.compile(item_key)
                if pattern.match(str(object_value)):
                    obj.datagrid_modifier_class = item_value
        except KeyError:
            pass

    kwargs = merge_config(kwargs)
    config = kwargs.copy()

    # i18n
    config["label_filter_placeholder"] = parse_kwarg(
        kwargs, "label_filter_placeholder", _("Filter resultaten")
    )
    config["label_no_results"] = parse_kwarg(kwargs, "label_no_results", _("Geen resultaten"))
    config["label_result_count"] = parse_kwarg(kwargs, "label_result_count", _("resultaten"))
    config["label_select_all"] = parse_kwarg(kwargs, "label_select_all", _("(De)selecteer alles"))

    # Showing Data/Filtering/Grouping/Ordering
    config["columns"] = get_columns()
    config["formset"] = get_formset()
    config["object_list"] = get_object_list(
        config.get("formset") and context.get("request").method == "POST"
    )
    config["filters"] = get_filters()
    config["groups"] = get_groups()
    config["dom_filter"] = parse_kwarg(kwargs, "dom_filter", False)
    config["ordering"] = get_ordering_dict()

    # Manipulating data (form)
    config["form"] = (
        parse_kwarg(kwargs, "form", False)
        or bool(kwargs.get("form_action"))
        or bool(kwargs.get("form_buttons"))
    )
    config["form_action"] = parse_kwarg(kwargs, "form_action", "")
    config["form_buttons"] = get_form_buttons()
    config["form_method"] = parse_kwarg(kwargs, "form_method", "POST")
    config["form_select"] = get_form_select()
    config["form_checkbox_name"] = kwargs.get("form_checkbox_name", "objects")
    config["form_select_all_position"] = kwargs.get("form_select_all_position", "top")

    config["toolbar_position"] = kwargs.get("toolbar_position", "top")

    # Custom presentation (get_<field>_display)/Color coded rows
    config = add_object_attributes(config)
    config["modifier_column"] = get_modifier_column()

    # Additional options
    config["class"] = kwargs.get("class", None)
    config["id"] = get_id(config, "datagrid")
    config["title"] = kwargs.get("title", None)
    config["url_reverse"] = kwargs.get("url_reverse", "")
    config["urlize"] = kwargs.get("urlize", True)

    # Context
    config["request"] = context["request"]
    config["config"] = kwargs
    return config
