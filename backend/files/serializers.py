from rest_framework import serializers
from .models import (
    UserImage, Userpic
)
from django.contrib.auth.models import User


class UserImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(
        use_url=True,
        required=True,
        )
# default=None,
    class Meta:
        model = UserImage
        read_only_fields = ('created_at', 'updated_at')


    # def create(self, instance, validated_data):
    #     """
    #     Create user image
    #     """
    #     print('CREATE USER IMAGE')

class UserpicSerializer(UserImageSerializer):
    owner = serializers.PrimaryKeyRelatedField(
        default=serializers.CurrentUserDefault(),
        queryset=User.objects,
        write_only=True
    )

    class Meta:
        model = Userpic
        fields = ('id', 'image', 'owner',)
