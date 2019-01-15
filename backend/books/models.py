from django.db import models
from django.contrib.auth.models import User

class Book(models.Model):
    GOOGLE_BOOK_API = 'google_book_api'
    BOOKS_API_CHOICES = (
        (GOOGLE_BOOK_API, 'Google book api'),
    )

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    source_api = models.CharField(
        choices=BOOKS_API_CHOICES,
        default=GOOGLE_BOOK_API,
        max_length=250,
    )
    source_id = models.CharField(max_length=250)
    title = models.TextField()
    authors = models.TextField(blank=True, null=True)
    thumbnail_link = models.URLField(blank=True, null=True)
    preview_link = models.URLField(blank=True, null=True)
    published_date = models.TextField(blank=True, null=True)

