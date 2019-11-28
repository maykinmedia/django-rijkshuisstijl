========
Datagrid
========

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
inspected to determince the type of the filters and optionally the choices.

- filterable_columns: Optional, a list defining which columns should be filterable.


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
    a field lookup
    Example: ['author', 'title']

- ordering_key: Optional, describes which query parameter should be used in hyperlinks
(set on the table captions) to indicate which order the view should provide, defaults to "ordering".


Pagination
----------

Data can be paginated if needed. Pagination can either be performed by the datagrid itself, or an already
available (Django) paginator may be used (since we need to support already paginated object lists).

Paginate un-paginated object_list
---------------------------------

- paginate: Optional, if True, paginate object_list (or queryset).
- paginate_by: Optional, amount of results per page, defaults to 30.
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
- paginator_zero_index: Optional, Use zero-based indexing for page numbers, not fully supported.


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
value of the "toolbar_postion" option.

- form: Optional, if True, adds a form to the datagrid, useful for allowing user manipulations on the dataset.
  Defaults to false, unless "form_action" or "form_buttons" is set.

- form_action: Optional, specifies the url to submit form actions to. If set, form will default to True.

- form_buttons: Optional, a list_of_dict (label, [href], [icon], [icon_src] [name], [target], [title]) defining
  which buttons to create (see rijkshuisstijl_form.button). The name attribute of the buttons should be used to
  specify the performed action.
  example: [{'name': 'delete', 'label': 'delete' 'class': 'button--danger'}]

- toolbar_position: Optional, can be set to one of "top", "bottom", or "both" indicating the position of the
  toolbar containing the buttons specified by form_buttons.

- form_checkbox_name: Optional, specifies the name for each checkbox input for an object in the table. This
  should be used for determining which objects should be manipulated by the performed action.


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
- id: Optional, a string specifying the datagrid id, defaults to a generated uuid4 string.
- urlize: Optional, if True (default) cell values are passed to "urlize" template filter, automatically creating
  hyperlinks if applicable in every cell.
- title: Optional, if set, a title will be shown above the datagrid.
- url_reverse: Optional, A URL name to reverse using the object's 'pk' attribute as one and only attribute,
  creates hyperlinks in the first cell. If no url_reverse if passed get_absolute_url is tried in order to find
  a url.
