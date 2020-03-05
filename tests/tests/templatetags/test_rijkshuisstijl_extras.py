from django.forms import ModelForm
from django.template import Context, Template
from django.test import RequestFactory, TestCase

from tests.models import Author, Book, Publisher


class KeyValueTableTestCase(TestCase):
    component = "key_value_table"
    group_class = "key-value-table__row"

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
        return Template(
            "{% load rijkshuisstijl %}{% " + self.component + " config=config %}"
        ).render(config)

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

    def test_fieldsets(self):
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

    def test_fieldsets_no_title(self):
        html = self.template_render(
            {
                "fields": {"title": "Title", "publisher__name": "Publisher"},
                "fieldsets": ((None, {"fields": ("title",)}),),
                "object": self.book,
            }
        )
        self.assertNotIn("key-value-table__header", html)

    def test_form(self):
        class MyModelForm(ModelForm):
            class Meta:
                fields = ["title"]
                model = Book

        form = MyModelForm(instance=self.book)

        html = self.template_render(
            {"fields": ["title", "available"], "object": self.book, "form": form,}
        )
        # self.assertIn('class="form"', html)
        # self.assertIn(f"{self.group_class}--edit", html)
        # self.assertIn('name="title"', html)
        # self.assertNotIn('name="available"', html)
        # self.assertNotIn('<span class="toggle"', html)

    def test_form_toggle(self):
        class MyModelForm(ModelForm):
            class Meta:
                fields = ["title"]
                model = Book

        form = MyModelForm(instance=self.book)

        html = self.template_render(
            {
                "fields": ["title", "available"],
                "object": self.book,
                "form": form,
                "field_toggle_edit": True,
            }
        )
        self.assertIn('class="form"', html)
        self.assertNotIn(f"{self.group_class}--edit", html)
        self.assertIn('name="title"', html)
        self.assertNotIn('name="available"', html)
        self.assertIn('<span class="toggle"', html)


class SummaryTestCase(KeyValueTableTestCase):
    component = "summary"
    group_class = "summary__key-value"
