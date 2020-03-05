from django.utils.translation import gettext_lazy as _

from rijkshuisstijl import settings
from rijkshuisstijl.templatetags.rijkshuisstijl import register

from .rijkshuisstijl_helpers import get_id, merge_config, parse_kwarg


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
    def get_object_list():
        context_object_list = context.get("object_list", [])
        context_queryset = context.get("queryset", context_object_list)
        object_list = config.get("object_list", context_queryset)
        object_list = config.get("queryset", object_list)
        return object_list

    config = merge_config(kwargs)

    # i18n
    config["label_confirm"] = parse_kwarg(config, "label_confirm", _("Bevestig"))

    # kwargs
    config["id"] = get_id(config, "confirm-form")
    config["class"] = config.get("class", None)
    config["method"] = config.get("method", "post")
    config["object_list"] = get_object_list()
    config["name_object"] = config.get("name_object", "object")
    config["name_confirm"] = config.get("name_confirm", "confirm")
    config["status"] = config.get("status", "warning")
    config["title"] = config.get("title", _("Actie bevestigen"))
    config["text"] = config.get("text", _("Weet u zeker dat u deze actie wilt uitvoeren?"))

    config["config"] = config
    return config


@register.inclusion_tag("rijkshuisstijl/components/form/form.html", takes_context=True)
def form(context, form=None, label="", **kwargs):
    kwargs = merge_config(kwargs)

    kwargs["form"] = form or parse_kwarg(kwargs, "form", context.get("form"))
    kwargs["action"] = kwargs.get("action")
    kwargs["compact"] = kwargs.get("compact")
    kwargs["label"] = kwargs.get("label", label)
    kwargs["title"] = kwargs.get("title")
    kwargs["subtitle"] = kwargs.get("subtitle")
    kwargs["text"] = kwargs.get("text")
    kwargs["urlize"] = kwargs.get("urlize")
    kwargs["wysiwyg"] = kwargs.get("wysiwyg")
    kwargs["status"] = kwargs.get("status")
    kwargs["intro_status"] = kwargs.get("intro_status")
    kwargs["tag"] = kwargs.get("tag", "form")
    kwargs["actions_align"] = kwargs.get("actions_align", "left")
    kwargs["actions_position"] = kwargs.get("actions_position", "auto")
    kwargs["help_text_position"] = kwargs.get(
        "help_text_position", settings.HELP_TEXT_POSITION
    )

    kwargs["request"] = context["request"]
    kwargs["config"] = kwargs
    return kwargs


@register.inclusion_tag("rijkshuisstijl/components/form/form-control.html")
def form_control(**kwargs):
    kwargs = merge_config(kwargs)
    kwargs["help_text_position"] = kwargs.get(
        "help_text_position", settings.HELP_TEXT_POSITION
    )
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
