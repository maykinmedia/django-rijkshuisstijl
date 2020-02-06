from django.views.generic import (
    CreateView as DjCreateView,
    DetailView as DjDetailView,
    ListView as DjListView,
    TemplateView as DjTemplateView,
    UpdateView as DjUpdateView,
)


class FormMixin:
    """
    Provides form_config using context and the get_form_config() method.
    """

    compact = False
    intro = None
    label = None
    status = "info"
    template_name = "rijkshuisstijl/views/generic/form.html"
    title = None
    subtitle = None
    text = None
    wysiwyg = None
    actions_position = "auto"
    help_text_position = "bottom"

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx["form_config"] = self.get_form_config()
        return ctx

    def get_form_config(self):
        return {
            "form": self.get_form(),
            "compact": self.compact,
            "intro": self.intro,
            "label": self.label,
            "status": self.status,
            "title": self.title,
            "subtitle": self.subtitle,
            "text": self.text,
            "wysiwyg": self.wysiwyg,
            "actions_position": self.actions_position,
            "help_text_position": self.help_text_position,
        }


class CreateView(FormMixin, DjCreateView):
    """
    Create view.
    Requires additional "title" property to be set to a form title.
    """

    template_name = "rijkshuisstijl/views/generic/create.html"


class DetailView(DjDetailView):
    """
    Detail view.
    Requires additional "fields" property to be set to model fields that should be shown.
    """

    fields = None
    fieldsets = None
    template_name = "rijkshuisstijl/views/generic/detail.html"
    toolbar_config = None

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx["toolbar_config"] = self.get_toolbar_config()
        ctx["key_value_table_config"] = self.get_key_value_table_config()
        return ctx

    def get_toolbar_config(self):
        return self.toolbar_config

    def get_key_value_table_config(self):
        return {
            "class": "key-value-table--justify",
            "object": self.get_object(),
            "fields": self.get_fields(),
            "fieldsets": self.get_fieldsets(),
        }

    def get_fields(self):
        return self.fields

    def get_fieldsets(self):
        return self.fieldsets


class ListView(DjListView):
    """
    List view.
    Shows a datagrid.
    Requires additional "fields" property to be set to model fields that should be shown.
    """

    datagrid_config = {}
    columns = None
    fields = []
    filterable_columns = None
    order = True
    orderable_columns = None
    ordering_key = "ordering"
    paginate = True
    paginate_by = 30
    modifier_key = None
    modifier_column = None
    modifier_mapping = None
    page_key = "page"
    urlize = True
    title = None
    subtitle = None
    template_name = "rijkshuisstijl/views/generic/list.html"

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx["datagrid_config"] = self.get_datagrid_config()
        ctx["title"] = self.title
        return ctx

    def get_paginate_by(self, queryset):
        """
        Leave pagination to the datagrid.
        :param queryset:
        :return: None
        """
        return None

    def get_datagrid_config(self):
        datagrid_config = {}
        datagrid_config["class"] = "datagrid--overflow-mobile"
        datagrid_config["columns"] = self.get_columns()
        datagrid_config["queryset"] = self.get_queryset()
        datagrid_config["title"] = self.subtitle

        # Filter
        datagrid_config["filterable_columns"] = self.get_filterable_columns()

        # Order
        datagrid_config["order"] = self.order
        datagrid_config["ordering_key"] = self.ordering_key

        # Paginate
        # Reset context.
        datagrid_config["is_paginated"] = False
        datagrid_config["paginator"] = None
        datagrid_config["page_obj"] = None
        # Leave pagination to the datagrid.
        datagrid_config["paginate"] = self.paginate
        datagrid_config["paginate_by"] = self.paginate_by
        datagrid_config["page_key"] = self.page_key

        # Colors
        datagrid_config["modifier_key"] = self.modifier_key
        datagrid_config["modifier_column"] = self.modifier_column
        datagrid_config["modifier_mapping"] = self.modifier_mapping

        if self.orderable_columns is None:
            datagrid_config["orderable_columns"] = self.get_orderable_columns()

        # Urlize
        datagrid_config["urlize"] = self.urlize
        return datagrid_config

    def get_columns(self):
        return self.columns or self.get_fields()

    def get_filterable_columns(self):
        if self.filterable_columns:
            return self.filterable_columns
        elif self.columns:
            return [column.get("key", column) for column in self.columns]
        return self.get_fields() or []

    def get_orderable_columns(self):
        if self.orderable_columns:
            return self.orderable_columns
        elif self.columns:
            return [column.get("key", column) for column in self.columns]
        return self.get_fields() or []

    def get_fields(self):
        return self.fields


class UpdateView(FormMixin, DjUpdateView):
    """
    Update view.
    Shows a form.
    Requires additional "title" property to be set to a form title.
    """

    template_name = "rijkshuisstijl/views/generic/update.html"


class TemplateView(DjTemplateView):
    """
    Template view.
    Shows a textbox.
    Requires at least one of additional "title", "text", "wysiwyg" properties to be set to content if textbox is used.
    shown.
    """

    status = None
    title = None
    text = None
    wysiwyg = None
    template_name = "rijkshuisstijl/views/generic/template.html"

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx["textbox_config"] = self.get_textbox_config()
        return ctx

    def get_textbox_config(self):
        return {
            "status": self.status,
            "title": self.title,
            "text": self.text,
            "wysiwyg": self.wysiwyg,
        }
