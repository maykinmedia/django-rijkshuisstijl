==========
Quickstart
==========

Installation
============

Install from PyPI with pip:

.. code-block:: bash

    pip install django-rijkshuisstijl


Then add "sitetree" and "rijkshuisstijl" to INSTALLED_APPS

Usage
=====

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
        </main>

        {% footer %}
        {% meta_js %}
    </body>

