#!/usr/bin/env python
import sys

from django.conf import settings
from django.core.management import execute_from_command_line


def runtests():
    try:
        module = sys.argv[1]
    except IndexError:
        module = "rijkshuisstijl"

    argv = sys.argv[:1] + ["test", module]
    execute_from_command_line(argv)


if not settings.configured:
    settings.configure(
        DATABASES={"default": {"ENGINE": "django.db.backends.sqlite3",}},
        INSTALLED_APPS=(
            "django.contrib.auth",
            "django.contrib.contenttypes",
            "rijkshuisstijl",
            "rijkshuisstijl.tests",
            "sitetree",
        ),
        MIDDLEWARE_CLASSES=[],
        ROOT_URLCONF="rijkshuisstijl.tests.urls",
        STATIC_URL="/static/",
        USE_TZ=True,
        TEMPLATES=[
            {
                "BACKEND": "django.template.backends.django.DjangoTemplates",
                "DIRS": [],
                "APP_DIRS": True,
                "OPTIONS": {
                    "debug": True,
                    "context_processors": ["django.template.context_processors.request",],
                },
            },
        ],
    )


if __name__ == "__main__":
    runtests()
