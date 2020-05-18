from django.utils.translation import gettext as _
from django.views.generic import (
    CreateView as DjCreateView,
    DetailView as DjDetailView,
    FormView as DjFormView,
    ListView as DjListView,
    TemplateView as DjTemplateView,
    UpdateView as DjUpdateView,
)

from rijkshuisstijl.conf import settings


class FormMixin:
    """
    Provides form_config using context and the get_form_config() method.
    """

    compact = False
    intro = None
    label = _("Verzenden")
    status = "info"
    template_name = "rijkshuisstijl/views/generic/form.html"
    title = None
    subtitle = None
    text = None
    wysiwyg = None
    actions_position = "auto"
    help_text_position = settings.RH_HELP_TEXT_POSITION

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
            "actions": self.get_actions(),
            "actions_position": self.actions_position,
            "help_text_position": self.help_text_position,
        }

    def get_actions(self):
        return [{"class": "button--primary", "label": self.label, "type": "submit",}]


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

    model = None
    datagrid_config = {}
    columns = None
    fields = []
    filterable_columns = None
    filter_action = None
    filter_query_params = None
    form = None
    form_action = ""
    form_method = "post"
    form_buttons = []
    form_checkbox_name = "objects"
    form_select_all_position = "top"
    form_select = None
    form_options = []
    form_model_name = "model"
    form_model_meta_label = None
    export_buttons = []
    export_input_name = "fields"
    toolbar_position = "top"
    order = True
    orderable_columns = None
    ordering_key = "ordering"
    paginate = True
    paginate_by = 100
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
        ctx["title_header_config"] = self.get_title_header_config()
        ctx["datagrid_config"] = self.get_datagrid_config()
        return ctx

    def get_paginate_by(self, queryset):
        """
        Leave pagination to the datagrid.
        :param queryset:
        :return: None
        """
        return None

    def get_title_header_config(self):
        title_header_config = {"title": self.title}
        return title_header_config

    def get_datagrid_config(self):
        datagrid_config = {}
        datagrid_config["class"] = "datagrid--overflow-mobile"
        datagrid_config["columns"] = self.get_columns()
        datagrid_config["model"] = self.model
        datagrid_config["queryset"] = self.get_queryset()
        datagrid_config["title"] = self.subtitle

        # Filter
        datagrid_config["filterable_columns"] = self.get_filterable_columns()
        datagrid_config["filter_action"] = self.filter_action
        datagrid_config["filter_query_params"] = self.filter_query_params

        # Form
        datagrid_config["form"] = self.form
        datagrid_config["form_action"] = self.form_action
        datagrid_config["form_method"] = self.form_method
        datagrid_config["form_buttons"] = self.form_buttons
        datagrid_config["form_checkbox_name"] = self.form_checkbox_name
        datagrid_config["form_select_all_position"] = self.form_select_all_position
        datagrid_config["form_select"] = self.form_select
        datagrid_config["form_options"] = self.form_options
        datagrid_config["form_model_name"] = self.form_model_name
        datagrid_config["export_buttons"] = self.export_buttons
        datagrid_config["export_input_name"] = self.export_input_name
        datagrid_config["toolbar_position"] = self.toolbar_position

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


class FormView(FormMixin, DjFormView):
    """
    Form view.
    Shows a form.
    Requires additional "title" property to be set to a form title.
    """

    pass


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
