from rest_framework import status, permissions, generics, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

from books.models import Book
from books.serializers import BookSerializer
from rest_framework.response import Response


class BookViewSet(viewsets.ModelViewSet):
    serializer_class = BookSerializer

    def get_queryset(self):
        try:
            return Book.objects.filter(owner=self.kwargs['user_pk'])
        except KeyError:
            return Book.objects.filter()


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

    # def get_queryset(self):
    #     """
    #     This view should return a list of all the books
    #     for the username in query params.
    #     """
    #     queryset = Book.objects.all()
    #     username = self.request.query_params.get('username', None)
    #     if username is not None:
    #         queryset = queryset.filter(owner__username=username)
    #     return queryset

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def my(self, request):
        my_books = Book.objects.filter(owner=request.user).order_by('-created_at')

        page = self.paginate_queryset(my_books)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(my_books, many=True)
        return Response(serializer.data)
