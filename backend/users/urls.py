from django.conf.urls import url
from rest_framework import routers

from . import views

from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    url(r'register', views.UserCreateView.as_view(), name='register'),
    url(r'^login/$', obtain_jwt_token, name='login'),
    url(r'^profile/$', views.ProfileView.as_view(), name='profile'),
]
