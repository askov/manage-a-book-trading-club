from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from users.models import Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(max_length=30,
                                     validators=[UniqueValidator(
                                         queryset=User.objects.all())]
                                     )
    password = serializers.CharField(min_length=8, write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'])
        return user

class ProfileSerializer(serializers.ModelSerializer):
    # user = UserSerializer(required=True)
    first_name = serializers.CharField(allow_blank=True, required=False)
    last_name = serializers.CharField(allow_blank=True, required=False)
    second_name = serializers.CharField(allow_blank=True, required=False)
    city = serializers.CharField(allow_blank=True, required=False)
    state = serializers.CharField(allow_blank=True, required=False)
    email = serializers.CharField(source='user.email')
    username = serializers.CharField(source='user.username')

    class Meta:
        model = Profile
        fields = ['first_name', 'last_name', 'second_name', 'city', 'state', 'email', 'username']

    # def update(self, instance, validated_data):
    #   profile_data = validated_data.pop('profile')
    #   print(profile_data)
      # # Unless the application properly enforces that this field is
      # # always set, the follow could raise a `DoesNotExist`, which
      # # would need to be handled.
      # profile = instance.profile

      # instance.username = validated_data.get('username', instance.username)
      # instance.email = validated_data.get('email', instance.email)
      # instance.save()

      # profile.company_name = profile_data.get(
      #     'company_name',
      #     profile.company_name
      # )
      # profile.save()

      # return instance

