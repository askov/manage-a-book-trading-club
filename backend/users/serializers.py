from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from users.models import Profile
from files.models import Userpic
from files.serializers import UserpicSerializer


class UserSerializer(serializers.ModelSerializer):
    """
    User serializer
    """

    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(max_length=30,
                                     validators=[UniqueValidator(
                                         queryset=User.objects.all())]
                                     )
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

    def create(self, validated_data):
        """
        Creates new user
        """
        user = User.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'])
        return user

class ProfileSerializer(serializers.ModelSerializer):
    """
    User serializer
    """
    first_name = serializers.CharField(allow_blank=True)
    last_name = serializers.CharField(allow_blank=True)
    city = serializers.CharField(allow_blank=True)
    state = serializers.CharField(allow_blank=True)
    email = serializers.CharField(source='user.email')
    username = serializers.CharField(source='user.username')
    # avatar = UserpicSerializer()
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = (
            'first_name', 'last_name', 'city',
            'state', 'email', 'username', 'avatar'
        )
        read_only_fields = ('email', 'username',)

    def update(self, instance, validated_data):
        """
        Updates user profile
        """
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.state = validated_data.get('state', instance.state)
        instance.city = validated_data.get('city', instance.city)
        if validated_data['avatar']:
            instance.avatar = Userpic.objects.create(
                owner=validated_data.get('user'),
                image=validated_data['avatar']
            )
        instance.save()
        return instance


    def get_avatar(self, obj):
        return obj.avatar and obj.avatar.image.url
