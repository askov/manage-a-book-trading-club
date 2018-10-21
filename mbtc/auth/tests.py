from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework import status


class AuthTests(APITestCase):
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
