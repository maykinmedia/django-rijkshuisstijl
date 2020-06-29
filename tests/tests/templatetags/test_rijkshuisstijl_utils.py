from django.test import TestCase
from django.utils.datetime_safe import date, datetime

from rijkshuisstijl.templatetags.rijkshuisstijl_utils import format_value
from tests.models import Author, Book, Publisher


class FormatValueTestCase(TestCase):
    def test_rh_display(self):
        publisher = Publisher.objects.create()
        publisher.rh_display_name = "Lorem ipsum"
        self.assertEqual(format_value(publisher, "name"), "Lorem ipsum")

    def test_get_display(self):
        publisher = Publisher.objects.create()
        publisher.get_name_display = lambda: "Lorem ipsum"

        self.assertEqual(format_value(publisher, "name"), "Lorem ipsum")

    def test___str__(self):
        publisher = Publisher.objects.create()
        self.assertEqual(format_value(publisher, "__str__"), str(publisher))

    def test_callable(self):
        publisher = Publisher.objects.create(name="Lorem ipsum")
        book = Book.objects.create(publisher=publisher)
        publisher.name_fn = lambda: "Lorem ipsum"

        self.assertEqual(format_value(publisher, "name_fn"), "Lorem ipsum")
        self.assertEqual(format_value(book, "publisher__name_fn"), "Lorem ipsum")

    def test_none(self):
        self.assertEqual(format_value(""), "-")
        self.assertEqual(format_value("", "", "No value"), "No value")

        publisher = Publisher.objects.create()
        book = Book.objects.create(publisher=publisher)
        publisher.name_fn = lambda: ""

        self.assertEqual(format_value(publisher, "name_fn"), "-")
        self.assertEqual(format_value(book, "publisher__name_fn"), "-")

    def test_bool(self):
        publisher = Publisher.objects.create()
        book = Book.objects.create(publisher=publisher)

        publisher.bool = True
        self.assertIn("true.png", format_value(publisher, "bool"))
        self.assertIn("true.png", format_value(book, "publisher__bool"))

        publisher.bool = lambda: True
        self.assertIn("true.png", format_value(book, "publisher__bool"))

        publisher.bool = False
        self.assertIn("false.png", format_value(book, "publisher__bool"))

        publisher.bool = lambda: False
        self.assertIn("false.png", format_value(book, "publisher__bool"))

    def test_str(self):
        self.assertEqual(format_value("Lorem ipsum"), "Lorem ipsum")

        publisher = Publisher.objects.create()
        book = Book.objects.create(publisher=publisher)
        publisher.str = "Lorem ipsum"

        self.assertEqual(format_value(publisher, "str"), "Lorem ipsum")
        self.assertEqual(format_value(book, "publisher__str"), "Lorem ipsum")

    def test_manager(self):
        publisher = Publisher.objects.create()
        author_1 = Author.objects.create()
        author_2 = Author.objects.create()
        book = Book.objects.create(publisher=publisher)
        book.authors.set((author_1, author_2))

        self.assertEqual(format_value(book, "authors"), f"{str(author_1)}, {str(author_2)}")

    def test_iterable(self):
        publisher = Publisher.objects.create()
        book = Book.objects.create(publisher=publisher)
        publisher.iterable = ["Lorem", "ipsum"]

        self.assertEqual(format_value(publisher, "iterable"), "Lorem, ipsum")
        self.assertEqual(format_value(book, "publisher__iterable"), "Lorem, ipsum")

    def test_date(self):
        publisher = Publisher.objects.create()
        book = Book.objects.create(publisher=publisher)
        book.date_published = date(2020, 6, 29)
        self.assertEqual(format_value(book, "date_published"), date(2020, 6, 29))

    def test_datetime(self):
        publisher = Publisher.objects.create()
        book = Book.objects.create(publisher=publisher)
        book.date_published = datetime(2020, 6, 29)
        self.assertEqual(format_value(book, "date_published"), datetime(2020, 6, 29))

    def test_model_instance(self):
        publisher = Publisher.objects.create()
        publisher.get_absolute_url = lambda: "http://lorem.ipsum"
        self.assertEqual(
            format_value(publisher), '<a class="link" href="http://lorem.ipsum">Foo Bar</a>'
        )
