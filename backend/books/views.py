from rest_framework import status, permissions, generics, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

from books.models import Book
from books.serializers import BookSerializer
from rest_framework.response import Response


class BookViewSet(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)