from django.contrib.auth.models import User
from rest_framework import status, viewsets
from trade_requests.models import TradeRequest
from books.models import Book
from trade_requests.serializers import TradeRequestSerializer, TradeRequestUpdateSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import action

class TradeRequestViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'PATCH':
            return TradeRequestUpdateSerializer
        return TradeRequestSerializer

    def get_queryset(self):
        try:
            return TradeRequest.objects.filter(target=self.kwargs['book_pk']).order_by('-updated_at')
        except KeyError:
            return TradeRequest.objects.all().order_by('-updated_at')

    # def get_permissions(self):
    #     permission_classes = []

    #     if not self.action in ['list', 'retrieve']:
    #         permission_classes = [IsAuthenticated]

    #     return [permission() for permission in permission_classes]


    def create(self, request, *args, **kwargs):
        reqdata =request.data.copy()
        reqdata.update({'target': kwargs['book_pk']})
        serializer = self.get_serializer(data=reqdata)
        serializer.is_valid(raise_exception=True)

        # Book onwer check
        target_book_owner = Book.objects.get(pk=kwargs['book_pk']).owner
        if (request.user == target_book_owner):
            raise PermissionDenied('You can not create trade request for your own book')

        # Request by current user is already created
        currentuser_requests = TradeRequest.objects.filter(target=kwargs['book_pk'], created_by=request.user).count()
        if (currentuser_requests > 0):
            raise PermissionDenied('Only one trading request per user is allowed for book')

        # There is already accepted request
        accepted_requests = TradeRequest.objects.filter(target=kwargs['book_pk'], status='accepted').count()
        if (accepted_requests > 0):
            raise PermissionDenied('Only one trade request can have accepted status')

        # Success
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


    def partial_update(self, request, pk=None, book_pk=None):
        target_book_owner = Book.objects.get(pk=book_pk)

        # User is not book owner
        if (request.user != target_book_owner.owner):
            raise PermissionDenied('Only book owner can change trading request status')

        # Don't change status if already accepted or declined
        trade_request = TradeRequest.objects.get(pk=pk)
        if (trade_request.status != 'pending'):
            raise PermissionDenied('You can not change trade request status different from pending')

        # Success
        serializer = TradeRequestUpdateSerializer(trade_request, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # Decline all trade requests for this book, if owner accepted
        if (request.data.get('status') == 'accepted'):
            TradeRequest.objects.filter(target=book_pk).exclude(pk=pk).update(status='declined')
        return Response(serializer.data)


class TradeRequestReadOnlyViewSet(viewsets.GenericViewSet):
    """
    Readonly viewset for user trade requests (cabinet)
    """
    queryset = TradeRequest.objects.all()
    serializer_class = TradeRequestSerializer
    permission_classes = [IsAuthenticated]

    # TODO: how to DRY this pagination part?
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def incoming(self, request):
        incoming_tr = TradeRequest.objects.filter(target__owner=request.user).order_by('-updated_at')

        page = self.paginate_queryset(incoming_tr)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(incoming_tr, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def outcoming(self, request):
        outcoming_tr = TradeRequest.objects.filter(created_by=request.user).order_by('-updated_at')

        page = self.paginate_queryset(outcoming_tr)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(outcoming_tr, many=True)
        return Response(serializer.data)