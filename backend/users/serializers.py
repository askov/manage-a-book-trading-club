from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from users.models import Profile
from books.models import Book
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
    username = serializers.CharField(
        max_length=30,
        validators=[
            UniqueValidator(queryset=User.objects.all())
        ]
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
            validated_data['username'], validated_data['email'], validated_data['password']
        )
        return user


class PublicUserSerializer(serializers.ModelSerializer):
    """
    Public user with minimal profile data
    """
    avatar = serializers.SerializerMethodField()
    books_added = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            'id', 'username', 'avatar', 'books_added'
        )
        read_only_fields = (
            'id', 'username', 'avatar', 'books_added'
        )

    def get_books_added(self, obj):
        return Book.objects.filter(owner=obj.id).count()

    def get_avatar(self, obj):
        try:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.profile.avatar.image.url)
        except:
            return None


class ExtendedPublicUserSerializer(PublicUserSerializer):
    city = serializers.CharField(source='profile.city')
    state = serializers.CharField(source='profile.state')
    first_name = serializers.CharField(source='profile.first_name')
    last_name = serializers.CharField(source='profile.last_name')


    class Meta:
        model = User
        fields = (
            'id', 'username', 'avatar', 'city', 'state', 'first_name', 'last_name', 'books_added',
        )
        read_only_fields = (
            'id', 'username', 'avatar', 'city', 'state', 'first_name', 'last_name', 'books_added',
        )


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
        instance.first_name = validated_data.get(
            'first_name', instance.first_name)
        instance.last_name = validated_data.get(
            'last_name', instance.last_name)
        instance.state = validated_data.get('state', instance.state)
        instance.city = validated_data.get('city', instance.city)
        try:
            if validated_data['avatar'] is None:
                raise ValueError('Avatar can not be None')
            instance.avatar = Userpic.objects.create(
                owner=validated_data.get('user'),
                image=validated_data['avatar']
            )
        except:
            pass
        instance.save()
        return instance

    def get_avatar(self, obj):
        try:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.avatar.image.url)
        except:
            return None
