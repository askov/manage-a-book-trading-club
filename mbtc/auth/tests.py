# from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework import status
# Create your tests here.


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
            'username': 'test',
            'email': 'test@example.com',
            'password': 'examplepassword',
        }

        res = self.client.post(self.create_url, data, foramt='json')
        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data['username'], data['username'])
        self.assertEqual(res.data['email'], data['email'])
        self.assertEqual('password' in res.data)
