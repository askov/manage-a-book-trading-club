from django.conf.urls import url
from . import views

from rest_framework.authtoken import views as rest_framework_views
urlpatterns = [
    url(r'register', views.UserCreate.as_view()),
    url(r'^me/$', rest_framework_views.obtain_auth_token,
        name='me')
]
