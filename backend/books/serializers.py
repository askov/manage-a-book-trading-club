# from django.contrib.auth.models import User, Group
from rest_framework import serializers
from books.models import Book
from django.contrib.auth.models import User


class BookSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(
        write_only=True,
        queryset=User.objects,
        default=serializers.CurrentUserDefault(),
    )
    source_api = serializers.CharField(write_only=True)
    source_id = serializers.CharField(write_only=True)
    username = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = (
          'id', 'owner', 'title', 'authors', 'thumbnail_link',
          'preview_link', 'published_date', 'source_api', 'source_id',
          'username'
        )

    def get_username(self, obj):
        return obj.owner.get_username()