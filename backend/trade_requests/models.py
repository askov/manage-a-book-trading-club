from django.db import models
from django.contrib.auth.models import User
from books.models import Book



class TradeRequest(models.Model):
    STATUS_PENDING = 'pending'
    STATUS_ACCEPTED = 'accepted'
    STATUS_DECLINED = 'declined'
    STATUS_CHOICES = (
        (STATUS_PENDING, 'Pending'),
        (STATUS_ACCEPTED, 'Accepted'),
        (STATUS_DECLINED, 'Declined'),
    )

    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    target = models.ForeignKey(Book, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(
        choices=STATUS_CHOICES,
        default=STATUS_PENDING,
        max_length=8,
    )
    message = models.CharField(blank=True, null=True, max_length=256)

