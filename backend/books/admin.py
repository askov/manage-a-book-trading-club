from django.contrib import admin

from django.contrib.auth.models import User
from .models import Book

class BookAdmin(admin.ModelAdmin):
    model = Book
    list_display = ('id', 'title', 'authors', 'owner',)
    list_display_links = ('id', 'title', 'owner', )

admin.site.register(Book, BookAdmin)