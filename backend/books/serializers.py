# from django.contrib.auth.models import User, Group
from rest_framework import serializers
from books.models import Book


class BookSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(
        read_only=True,
        default=serializers.CurrentUserDefault()
    )
    class Meta:
        model = Book
        fields = (
          'id', 'owner', 'title', 'authors', 'thumbnail_link',
          'preview_link', 'published_date', 'source_api', 'source_id',
        )
        # read_only_fields = ('owner',)