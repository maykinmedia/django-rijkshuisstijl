import re

from rijkshuisstijl.templatetags.rijkshuisstijl import register


@register.filter
def get(value, key):
    """
    Gets a value from a dict by key.
    Returns empty string on failure.
    :param value: A dict containing key.
    :return: The key's value or ''.
    """
    try:
        return value[key]
    except:
        return ""


@register.filter
def getattr_or_get(value, key, default=""):
    """
    Gets an attribute from an object or a value from a dict by key.
    Returns empty string on failure.
    :param value: An object or dict containing key.
    :return: The key's value or ''.
    """
    try:
        return getattr(value, key, default)
    except AttributeError:
        return get(value, key, default)
    except:
        return default
