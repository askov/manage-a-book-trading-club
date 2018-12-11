# from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, generics, viewsets
from rest_framework.generics import RetrieveAPIView
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from users.serializers import UserSerializer, ProfileSerializer
from users.permissions import IsOwnerOrReadOnly
from users.models import Profile
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

class UserCreateView(APIView):
    """
    Creates the user
    """

    def post(self, request, format='json'):
        """ Handles user registration """
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = Token.objects.create(user=user)
            json = serializer.data
            json['token'] = token.key
            return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

import time

class ProfileView(APIView):
    """ """

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        time.sleep(3)
        try:
          user_profile = Profile.objects.get(user=request.user)
          serializer = ProfileSerializer(user_profile)
          return Response(serializer.data)
        except:
          return Response(status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        user_profile = Profile.objects.get(user=request.user)
        serializer = ProfileSerializer(user_profile, data=request.data, partial=True)
        if serializer.is_valid():
          serializer.save(user=request.user)
          return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
