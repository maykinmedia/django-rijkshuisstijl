from datetime import timedelta

import factory
import factory.fuzzy

from django.utils import timezone

from rijkshuisstijl.tests.models import Author, Award, Book, Publisher


class AuthorFactory(factory.django.DjangoModelFactory):
    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")
    gender = factory.fuzzy.FuzzyChoice(("female", "male"))

    class Meta:
        model = Author


class AwardFactory(factory.django.DjangoModelFactory):
    name = factory.Faker("name")
    author = factory.SubFactory(AuthorFactory)

    class Meta:
        model = Award


class PublisherFactory(factory.django.DjangoModelFactory):
    name = factory.Faker("name")

    class Meta:
        model = Publisher


class BookFactory(factory.django.DjangoModelFactory):
    publisher = factory.SubFactory(PublisherFactory)
    available = factory.Faker("pybool")
    avg_rating = factory.Faker("pydecimal", left_digits=1, right_digits=2)
    date_published = factory.fuzzy.FuzzyDateTime(
        timezone.now() - timedelta(days=30), timezone.now() - timedelta(days=1)
    )
    last_updated = factory.fuzzy.FuzzyDateTime(
        timezone.now() - timedelta(days=5), timezone.now() - timedelta(days=1)
    )
    stock = factory.Faker("pyint", min_value=5)
    title = factory.Faker("words", nb=3)
    random_set = factory.Faker("words", nb=5)

    @factory.post_generation
    def authors(self, create, extracted, **kwargs):
        authors = []

        if not create:
            return

        if extracted:
            authors = extracted

        for author in authors:
            self.authors.add(author)

    class Meta:
        model = Book
