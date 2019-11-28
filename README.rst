=====================
Django-rijkshuisstijl
=====================

* Basic rijkshuisstijl (Dutch government branding) layout including headers, footer, buttons, forms and more.
* Default generic views for dealing with models. (CreateView, DetailView, Listview, UpdateView)
* TemplateView for showing simple messages.
* Modular setup using inclusion tags.
* Responsive


Installation
============

- Install from PyPI with pip:

.. code-block:: bash

    pip install django-rijkshuisstijl


- Add "rijkshuisstijl", "sitetree" and "sniplates" to INSTALLED_APPS.
- Make sure that "django.template.context_processors.request" is added as a context processor.

Settings
--------

Optionally, configure these settings:

- LOGIN_URL
- LOGIN_REDIRECT_URL
- LOGOUT_URL
- REGISTRATION_URL


Usage
=====

Django-rijkshuisstijl can be utilized by using one of the generic views or by using components individually by utilizing
one of the available inclusion tags.

Generic views
-------------

Django-rijkshuisstijl exposes various generic views (CreateView, DetailView, Listview, UpdateView, and TemplateView)
found in "rijkshuisstijl.views.generic". These views use templates which are provided by django-rijkshuisstijl which can
be overridden for more customization:

- CreateView: rijkshuisstijl/views/generic/create.html
- DetailView: rijkshuisstijl/views/generic/detail.html
- Listview: rijkshuisstijl/views/generic/list.html
- UpdateView: rijkshuisstijl/views/generic/update.html
- TemplateView: rijkshuisstijl/views/generic/template.html

Note: create.html and form.html both directly extend "rijkshuisstijl/views/generic/form.html".
Note: all of the above extend from "rijkshuisstijl/views/abstract/base.html" and "rijkshuisstijl/views/abstract/master.html"

These views directly extend the Django views and require minimal configuration:


.. code-block:: python

    from rijkshuisstijl.views.generic import CreateView, DetailView, ListView, UpdateView, TemplateView:
    from .models import Book

    class BookCreateView(CreateView):
        model = Book
        title = "New book"


    class BookDetailView(DetailView):
        model = Book
        fields = [
            "title",
            "authors",
            "publisher",
            "status",
        ]


    class BookListView(ListView):
        model = Book
        fields = [
            "title",
            "authors",
            "publisher",
            "status",
        ]


    class BookUpdateView(UpdateView):
        model = Book
        title = "Edit book"


    class TemplateView(TemplateView):
        title = "Some text message title"
        text = "I am a textbox."


Inclusion tags
--------------

Django-rijkshuisstijl exposes various inclusion tags/components by loading "rijkshuisstijl" library. Each component takes one ore more keyword arguments and some components might take positional argument(s). A special keyword argument "config" is used to provide a dict containing an entire configuration for a component, useful for specifying the configuration from a view.

- Please refer to the `templatetags <https://github.com/maykinmedia/django-rijkshuisstijl/tree/master/rijkshuisstijl/templatetags>`_ source for a list of available libraries and components and their configuration details.

**Base template setup (see: rijkshuisstijl/views/abstract/base.html)**

Add CSS/JS/icons to your main template:

.. code-block:: html

    {% load rijkshuisstijl %}
    <!DOCTYPE html>
    <html lang="nl" class="views">
    <head>
        {% meta_css %}
        {% meta_icons %}
    </head>
    <body class="view__body">
        {% meta_js %}
    </body>

Then add the basic structure, supply the current urls for various urls (depending on your project):

.. code-block:: html

    {% load rijkshuisstijl %}
    <!DOCTYPE html>
    <html lang="nl" class="views">
    <head>
        {% meta_css %}
        {% meta_icons %}
    </head>
    <body class="view__body">
        {% skiplink %}
        {% login_bar details_url='#' logout_url='#' login_url='#' registration_url='#' %}
        {% header %}
        {% navigation_bar details_url='#' logout_url='#' login_url='#' registration_url='#' %}

        <main class="view__content">
            {% skiplink_target %}
            {% block messages %}
                {% for message in messages %}
                    {% textbox class='textbox--compact' text=message status=message.level_tag %}
                {% endfor %}
            {% endblock %}
        </main>

        {% footer %}
        {% meta_js %}
    </body>
