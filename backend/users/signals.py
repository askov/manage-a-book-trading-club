from django.contrib.auth.models import User
from users.models import Profile
from django.db.models.signals import post_save
from django.dispatch import receiver



@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **_kwargs):
    """
    Creates user profile when user created
    """
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **_kwargs):
    """
    Updates user profile when user saved
    """
    instance.profile.save()
