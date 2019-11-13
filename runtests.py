#!/usr/bin/env python
import sys

from django.conf import settings
from django.core.management import execute_from_command_line


def runtests():
    argv = sys.argv[:1] + ['test', 'tests']
    execute_from_command_line(argv)


if not settings.configured:
    settings.configure(
        DATABASES={
            'default': {
                'ENGINE': 'django.db.backends.sqlite3',
            }
        },
        INSTALLED_APPS=(
            'django.contrib.auth',
            'django.contrib.contenttypes',

            'rijkshuisstijl',
            'sniplates',
            'sitetree',

            'tests',
        ),
        MIDDLEWARE_CLASSES=[],
        ROOT_URLCONF='tests.urls',
        TEMPLATES=[
            {
                'BACKEND': 'django.template.backends.django.DjangoTemplates',
                'DIRS': [],
                'APP_DIRS': True,
                'OPTIONS': {
                    'debug': True,
                    'context_processors': [
                        'django.template.context_processors.request',
                    ]
                }
            },
        ]
    )


if __name__ == '__main__':
    runtests()
