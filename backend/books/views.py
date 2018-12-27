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

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """

        permission_classes = []

        if not self.action in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated]

        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        """
        This view should return a list of all the books
        for the username in query params.
        """
        queryset = Book.objects.all()
        username = self.request.query_params.get('username', None)
        if username is not None:
            queryset = queryset.filter(owner__username=username)
        return queryset