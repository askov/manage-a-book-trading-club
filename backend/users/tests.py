from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework_jwt.settings import api_settings


class SignupTests(APITestCase):
    def setUp(self):
        self.test_user = User.objects.create_user(
            'testuser', 'test@example.com', 'testpassword')
        self.create_url = reverse('register')

    def test_create_user(self):
        """
        Test if we can create a new user with a valid token
        """
        data = {
            'username': 'adam',
            'email': 'foo@bar.com',
            'password': 'examplepassword',
        }

        res = self.client.post(self.create_url, data, format='json')
        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data['username'], data['username'])
        self.assertEqual(res.data['email'], data['email'])
        self.assertFalse('password' in res.data)

        user = User.objects.latest('id')
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)

        self.assertEqual(res.data['token'], token)

    def test_create_user_with_too_short_password(self):
        """
        Test user can't be created with password length less than 8
        """
        data = {
            'username': 'adam',
            'email': 'adam@mail.com',
            'password': '123'
        }
        res = self.client.post(self.create_url, data, format='json')
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(res.data['password']), 1)

    def test_create_user_with_no_password(self):
        """
        Test user can't be created with empty password
        """
        data = {
            'username': 'adam',
            'email': 'adam@mail.com',
            'password': ''
        }
        res = self.client.post(self.create_url, data, format='json')
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(res.data['password']), 1)

    def test_create_user_with_whitespace_in_password(self):
        """
        Test user can't be created with whitespace in password
        """
        data = {
            'username': 'adam',
            'email': 'adam@mail.com',
            'password': '12  3'
        }
        res = self.client.post(self.create_url, data, format='json')
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(res.data['password']), 1)

    def test_create_user_with_too_long_username(self):
        """
        Test user can't be created with too long username
        """
        data = {
            'username': 'adam'*8,
            'email': 'adam@mail.com',
            'password': 'examplepassword'
        }
        res = self.client.post(self.create_url, data, format='json')
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(res.data['username']), 1)

    def test_create_user_with_no_username(self):
        """
        Test user can't be created without username
        """
        data = {
            'username': '',
            'email': 'adam@mail.com',
            'password': 'examplepassword'
        }
        res = self.client.post(self.create_url, data, format='json')
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(res.data['username']), 1)

    def test_create_user_with_existing_username(self):
        """
        Test user can't be created without username
        """
        data = {
            'username': 'testuser',
            'email': 'adam@mail.com',
            'password': 'examplepassword'
        }
        res = self.client.post(self.create_url, data, format='json')
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(res.data['username']), 1)

    def test_create_user_with_existing_email(self):
        data = {
            'username': 'adam',
            'email': 'test@example.com',
            'password': 'examplepassword'
        }

        res = self.client.post(self.create_url, data, format='json')
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(res.data['email']), 1)

    def test_create_user_with_invalid_email(self):
        data = {
            'username': 'adam',
            'email':  'adammail.com',
            'passsword': 'examplepassword'
        }

        res = self.client.post(self.create_url, data, format='json')
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(res.data['email']), 1)

    def test_create_user_with_no_email(self):
        data = {
            'username': 'adam',
            'email': '',
            'password': 'examplepassword'
        }

        res = self.client.post(self.create_url, data, format='json')
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(res.data['email']), 1)


class LoginTests(APITestCase):
    def setUp(self):
        self.test_user = User.objects.create_user(
            'testuser', 'test@example.com', 'testpassword')
        self.login_url = reverse('login')

    def test_user_login_with_correct_credentials(self):
        data = {
            'username': 'testuser',
            'password': 'testpassword'
        }

        res = self.client.post(self.login_url, data, format='json')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual('token' in res.data, True)
        self.assertEqual(isinstance(res.data['token'], str), True)

        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(self.test_user)
        token = jwt_encode_handler(payload)

        self.assertEqual(res.data['token'] == token, True)

    def test_user_login_with_wrong_username(self):
        data = {
            'username': 'testuser1',
            'password': 'testpassword'
        }

        res = self.client.post(self.login_url, data, format='json')
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual('non_field_errors' in res.data, True)

    def test_user_login_with_wrong_password(self):
        data = {
            'username': 'testuser',
            'password': 'testpassword1'
        }

        res = self.client.post(self.login_url, data, format='json')
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual('non_field_errors' in res.data, True)


class UserProfileTests(APITestCase):
    def setUp(self):
        self.user_data = {
            'username': 'testuser',
            'password': 'testpassword',
            'email': 'test@mail.ru'
        }
        self.test_user = User.objects.create_user(
            self.user_data['username'], self.user_data['email'], self.user_data['password'])
        self.login_url = reverse('login')
        self.profile_url = reverse('profile')

    def test_user_login_and_get_profile(self):
        data = self.user_data.copy()
        data.pop('email')
        res = self.client.post(self.login_url, data, format='json')
        res = self.client.get(self.profile_url, HTTP_AUTHORIZATION='Bearer {}'.format(res.data['token']))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual('email' in res.data, True)
        self.assertEqual(res.data['email'] == self.user_data['email'], True)

# TODO: signal tests