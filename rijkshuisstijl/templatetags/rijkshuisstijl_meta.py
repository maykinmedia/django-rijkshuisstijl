from django import template

from .rijkshuisstijl_helpers import merge_config

register = template.Library()


@register.inclusion_tag('rijkshuisstijl/components/meta/meta-css.html')
def meta_css(**kwargs):
    kwargs = merge_config(kwargs)
    kwargs['config'] = kwargs
    return kwargs


@register.inclusion_tag('rijkshuisstijl/components/meta/meta-js.html')
def meta_js(**kwargs):
    kwargs = merge_config(kwargs)
    kwargs['config'] = kwargs
    return kwargs


@register.inclusion_tag('rijkshuisstijl/components/meta/meta-icons.html')
def meta_icons(**kwargs):
    kwargs = merge_config(kwargs)
    kwargs['config'] = kwargs
    return kwargs
