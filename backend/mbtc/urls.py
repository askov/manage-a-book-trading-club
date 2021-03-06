"""mbtc URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path
from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin

from rest_framework_nested import routers

router = routers.SimpleRouter()


# Public user viewset
from users.views import UserViewSet
router.register(r'users', UserViewSet, base_name='user')


# Books
from books.views import BookViewSet
from trade_requests.views import TradeRequestViewSet

router.register(r'books', BookViewSet, base_name='book')
books_router = routers.NestedSimpleRouter(router, r'books', lookup='book')
books_router.register(r'trade_requests', TradeRequestViewSet, base_name='book-trade-requests')


users_router = routers.NestedSimpleRouter(router, r'users', lookup='user')
users_router.register(r'books', BookViewSet, base_name='user-books')

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^accounts/', include('users.urls')),
    url(r'^', include('trade_requests.urls')),
] + router.urls + users_router.urls + books_router.urls + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
