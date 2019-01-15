from django.contrib.auth.models import User
from rest_framework import status, viewsets
from trade_requests.models import TradeRequest
from books.models import Book
from trade_requests.serializers import TradeRequestSerializer, TradeRequestUpdateSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied


class TradeRequestViewSet(viewsets.ModelViewSet):
    def get_serializer_class(self):
        if self.request.method == 'PATCH':
            return TradeRequestUpdateSerializer
        return TradeRequestSerializer

    def get_queryset(self):
        try:
            return TradeRequest.objects.filter(target=self.kwargs['book_pk']).order_by('-updated_at')
        except KeyError:
            return TradeRequest.objects.all().order_by('-updated_at')

    def get_permissions(self):
        permission_classes = []

        if not self.action in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated]

        return [permission() for permission in permission_classes]


    def create(self, request, *args, **kwargs):
        reqdata =request.data.copy()
        reqdata.update({'target': kwargs['book_pk']})
        serializer = self.get_serializer(data=reqdata)
        serializer.is_valid(raise_exception=True)

        # TODO: add custom messages: case 1: own book, case 2: there is accepted request already
        # Book onwer check
        target_book_owner = Book.objects.get(pk=kwargs['book_pk']).owner
        if (request.user == target_book_owner):
            raise PermissionDenied()

        # Request by current user is already created
        currentuser_requests = TradeRequest.objects.filter(created_by=request.user).count()
        if (currentuser_requests > 0):
            raise PermissionDenied()

        # There is already accepted request
        accepted_requests = TradeRequest.objects.filter(target=kwargs['book_pk'], status='accepted').count()
        if (accepted_requests > 0):
            raise PermissionDenied()

        # Success
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


    def partial_update(self, request, pk=None, book_pk=None):
        print('THIS IS PARTIAL UPDATE')
        print('current user', request.user)
        print('book id', book_pk)
        target_book_owner = Book.objects.get(pk=book_pk)
        print('target_book owner', target_book_owner.owner)
        if (request.user != target_book_owner.owner):
            print('OK: user is book owner')
            trade_request = TradeRequest.objects.get(pk=pk)
            serializer = TradeRequestUpdateSerializer(trade_request, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
        else:
            raise PermissionDenied()
