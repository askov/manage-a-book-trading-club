from django.conf.urls import url
from rest_framework import routers

from . import views

from rest_framework_jwt.views import obtain_jwt_token

router = routers.SimpleRouter()
router.register(r'users', views.UserViewSet, 'users-public')

urlpatterns = [
    url(r'register', views.UserCreateView.as_view(), name='register'),
    url(r'^login/$', obtain_jwt_token, name='login'),
    url(r'^profile/$', views.ProfileView.as_view(), name='profile'),
    # url(r'^users/$', views.UserViewSet),
    # url(r'^users/$', views.UserPublic.as_view(), name='users'),
] + router.urls
