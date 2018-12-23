from rest_framework import serializers
from .models import (
    UserImage, Userpic
)
from django.contrib.auth.models import User


class UserImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(
        use_url=True,
        required=False,
        default=None,)

    class Meta:
        model = UserImage
        exclude = ('created_at', 'updated_at', )
        # write_only_fields = ('owner',)

    def create(self, validated_data):
        pass
        # avatar = validated_data.get('avatar')
        # return avatar

class UserpicSerializer(UserImageSerializer):
    owner = serializers.PrimaryKeyRelatedField(
        default=serializers.CurrentUserDefault(),
        queryset=User.objects,
        write_only=True
    )

    class Meta:
        model = Userpic
        fields = ('id', 'image', 'owner', )
        # write_only_fields = ('owner', )