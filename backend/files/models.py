"""File upload models

This module provides models for user files
"""
import os
import uuid
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.

class UserImage(models.Model):
    """ Standard user image model """
    upload_path = 'images/'

    def get_upload_path(self, filename: str) -> str:
        """ Return path for uploaded image.

        Features:
        1. Form path depending on date
        2. Rename file to random UUID

        """
        extension = os.path.splitext(filename)[1]
        file_name = str(uuid.uuid4()) + extension
        return os.path.join(self.upload_path, timezone.now().date().strftime("%Y/%m/%d"), file_name)

    image = models.ImageField(upload_to=get_upload_path)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True




class Userpic(UserImage):
    """ User profile image """
    upload_path = 'images/profile/'
