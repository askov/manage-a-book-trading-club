
"""User account related models

This module provides models for user accounts
"""
from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    """ User profile """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ForeignKey(
        'files.Userpic',
        on_delete=models.SET_NULL,
        blank=True, null=True,
        related_name='profile_avatar')
    # image = models.ImageField(upload_to="users/images/", null=True, blank=True)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    state = models.CharField(max_length=50, blank=True)
    city = models.CharField(max_length=50, blank=True)

