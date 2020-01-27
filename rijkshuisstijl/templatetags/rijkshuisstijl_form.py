from uuid import uuid4

from django.utils.translation import gettext_lazy as _

from rijkshuisstijl.templatetags.rijkshuisstijl import register

from .rijkshuisstijl_helpers import merge_config, parse_kwarg


@register.inclusion_tag("rijkshuisstijl/components/button/button.html")
def button(**kwargs):
    kwargs = merge_config(kwargs)

    # kwargs
    kwargs["class"] = kwargs.get("class", None)
    kwargs["icon"] = kwargs.get("icon", None)
    kwargs["icon_src"] = kwargs.get("icon_src", None)
    kwargs["id"] = kwargs.get("id", None)
    kwargs["label"] = kwargs.get("label", None)
    kwargs["title"] = kwargs.get("title", kwargs.get("label"))
    kwargs["toggle_target"] = kwargs.get("toggle_target", None)
    kwargs["toggle_modifier"] = kwargs.get("toggle_modifier", None)
    kwargs["type"] = kwargs.get("type", None)
    kwargs["name"] = kwargs.get("name", None)
    kwargs["value"] = kwargs.get("value", None)

    kwargs["config"] = kwargs
    return kwargs


@register.inclusion_tag("rijkshuisstijl/components/button/link.html")
def button_link(**kwargs):
    kwargs = merge_config(kwargs)

    kwargs["class"] = kwargs.get("class", None)
    kwargs["icon"] = kwargs.get("icon", None)
    kwargs["icon_src"] = kwargs.get("icon_src", None)
    kwargs["href"] = kwargs.get("href", "")
    kwargs["target"] = kwargs.get("target", None)
    kwargs["label"] = kwargs.get("label", None)
    kwargs["title"] = kwargs.get("title", kwargs.get("label"))

    kwargs["config"] = kwargs
    return kwargs


@register.inclusion_tag(
    "rijkshuisstijl/components/confirm-form/confirm-form.html", takes_context=True
)
def confirm_form(context, **kwargs):
    def get_id():
        return kwargs.get("id", "confirm-form-" + str(uuid4()))

    def get_object_list():
        context_object_list = context.get("object_list", [])
        context_queryset = context.get("queryset", context_object_list)
        object_list = kwargs.get("object_list", context_queryset)
        object_list = kwargs.get("queryset", object_list)
        return object_list

    kwargs = merge_config(kwargs)

    # i18n
    kwargs["label_confirm"] = parse_kwarg(kwargs, "label_confirm", _("Bevestig"))

    # kwargs
    kwargs["id"] = get_id()
    kwargs["class"] = kwargs.get("class", None)
    kwargs["method"] = kwargs.get("method", "post")
    kwargs["object_list"] = get_object_list()
    kwargs["name_object"] = kwargs.get("name_object", "object")
    kwargs["name_confirm"] = kwargs.get("name_confirm", "confirm")
    kwargs["status"] = kwargs.get("status", "warning")
    kwargs["title"] = kwargs.get("title", _("Actie bevestigen"))
    kwargs["text"] = kwargs.get("text", _("Weet u zeker dat u deze actie wilt uitvoeren?"))

    kwargs["config"] = kwargs
    return kwargs


@register.inclusion_tag("rijkshuisstijl/components/form/form.html", takes_context=True)
def form(context, form=None, label="", **kwargs):
    kwargs = merge_config(kwargs)

    kwargs["form"] = form or parse_kwarg(kwargs, "form", context.get("form"))
    kwargs["action"] = kwargs.get("action")
    kwargs["compact"] = kwargs.get("compact")
    kwargs["label"] = label
    kwargs["title"] = kwargs.get("title")
    kwargs["subtitle"] = kwargs.get("subtitle")
    kwargs["text"] = kwargs.get("text")
    kwargs["urlize"] = kwargs.get("urlize")
    kwargs["wysiwyg"] = kwargs.get("wysiwyg")
    kwargs["status"] = kwargs.get("status")
    kwargs["tag"] = kwargs.get("tag", "form")
    kwargs["actions_position"] = kwargs.get("actions_position", "auto")
    kwargs["help_text_position"] = kwargs.get("help_text_position", "bottom")

    kwargs["request"] = context["request"]
    kwargs["config"] = kwargs
    return kwargs


@register.inclusion_tag("rijkshuisstijl/components/form/form-control.html")
def form_control(**kwargs):
    kwargs = merge_config(kwargs)
    kwargs["help_text_position"] = kwargs.get("help_text_position", "bottom")
    kwargs["config"] = kwargs
    return kwargs


@register.inclusion_tag("rijkshuisstijl/components/form/input.html")
def form_input(**kwargs):
    kwargs = merge_config(kwargs)
    kwargs["config"] = kwargs
    return kwargs


@register.inclusion_tag("rijkshuisstijl/components/form/checkbox.html")
def form_checkbox(**kwargs):
    kwargs = merge_config(kwargs)
    kwargs["config"] = kwargs
    return kwargs


@register.inclusion_tag("rijkshuisstijl/components/form/radio.html")
def form_radio(**kwargs):
    kwargs = merge_config(kwargs)
    kwargs["config"] = kwargs
    return kwargs


@register.inclusion_tag("rijkshuisstijl/components/form/select.html")
def form_select(**kwargs):
    kwargs = merge_config(kwargs)
    kwargs["config"] = kwargs
    return kwargs


@register.inclusion_tag("rijkshuisstijl/components/form/help-text.html")
def help_text(help_text, **kwargs):
    kwargs = merge_config(kwargs)
    kwargs["config"] = kwargs
    kwargs["for"] = kwargs.get("for")
    kwargs["help_text"] = kwargs.get("help_text", help_text)
    return kwargs


@register.inclusion_tag("rijkshuisstijl/components/form/label.html")
def label(**kwargs):
    kwargs = merge_config(kwargs)
    kwargs["config"] = kwargs
    return kwargs
