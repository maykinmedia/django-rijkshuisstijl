========
Datagrid
========

A datagrid component is supplied for displaying list/table data, it can be configured to support color pagination and
color markers. In this example the object_list of a paginated ListView is passed to a datagrid instance. It assumes
every object in the queryset has a (@)property "in_stock_pretty" which returns either "yes" or "no". Based on this value
the table row, and the in_stock_pretty column is marked with the mapped color. Please refer to the bottom of this
document for a full list of available colors.

.. code-block:: html

    {% load rijkshuisstijl %}
    {% datagrid class='datagrid--overflow-mobile' orderable_columns='event_name, official:official__first_name, location_pretty:event_city, event_date, status_pretty:status' columns='event_name:Naam, official:Bewindspersoon, location_pretty:Locatie, event_date:Datum, status_pretty:Status' queryset=object_list is_paginated=True paginator=paginator page_obj=page_obj modifier_key='status' modifier_column='status_pretty' modifier_mapping='new:light-blue, recommendation:heaven-blue, decision:dark-blue, draft:mint-green, complete:green' %}

Additionally, a class parameter can be passed providing additional classes for the datagrid's HTML output. Certain
predefined classes can be used to alter it's behaviour:

 - "datagrid--scroll" limits the datagrid height forcing it to use a nested scroll.
 - "datagrid--overflow" allows (horizontal) scrolling when needed.
 - "datagrid--overflow-mobile" limits "datagrid--overflow" behaviour to smaller screens.


Available colors
================

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
