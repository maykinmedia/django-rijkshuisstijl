from django.template import Context, Template
from django.test import RequestFactory, TestCase

from tests.models import Author, Book, Publisher


class KeyValueTableTestCase(TestCase):
    def setUp(self):
        self.publisher_1 = Publisher.objects.create(name="Foo")
        self.publisher_2 = Publisher.objects.create(name="Bar")

        self.author_1 = Author.objects.create(first_name="John", last_name="Doe")
        self.author_2 = Author.objects.create(first_name="Joe", last_name="Average")

        self.book = Book.objects.create(title="Lorem", publisher=self.publisher_1)
        self.book.authors.set((self.author_1, self.author_2))

    def template_render(self, config=None, data={}):
        config = config or {}
        config = Context({"config": config, "request": RequestFactory().get("/foo", data)})
        return Template("{% load rijkshuisstijl %}{% key_value_table config=config %}").render(
            config
        )

    def test_render(self):
        html = self.template_render(
            {"fields": {"title": "Title", "publisher": "Publisher"}, "object": self.book}
        )

        self.assertInHTML("Title", html)
        self.assertInHTML("Lorem", html)
        self.assertInHTML("Publisher", html)
        self.assertInHTML("Foo", html)

    def test_related_model_field(self):
        html = self.template_render(
            {"fields": {"title": "Title", "publisher__name": "Publisher"}, "object": self.book}
        )
        self.assertInHTML("Foo", html)

    def test_alternative_syntax(self):
        config = Context({"object": self.book, "request": RequestFactory().get("/foo", {})})
        html = Template(
            "{% load rijkshuisstijl %}{% key_value_table object=object fields='title:Title, publisher__name:Publisher' %}"
        ).render(config)

        self.assertInHTML("Title", html)
        self.assertInHTML("Lorem", html)
        self.assertInHTML("Publisher", html)
        self.assertInHTML("Foo", html)

    def tests_fieldsets(self):
        html = self.template_render(
            {
                "fields": {"title": "Title", "publisher__name": "Publisher"},
                "fieldsets": (
                    ("Book details", {"fields": ("title",)}),
                    ("Publisher details", {"fields": ("publisher__name",)}),
                ),
                "object": self.book,
            }
        )
        self.assertInHTML("Lorem", html)
        self.assertInHTML("Foo", html)

    def tests_fieldsets_no_title(self):
        html = self.template_render(
            {
                "fields": {"title": "Title", "publisher__name": "Publisher"},
                "fieldsets": ((None, {"fields": ("title",)}),),
                "object": self.book,
            }
        )
        self.assertNotIn("key-value-table__header", html)
