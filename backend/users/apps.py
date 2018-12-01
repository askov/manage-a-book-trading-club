from django.apps import AppConfig

class UsersConfig(AppConfig):
    name = 'users'

    def ready(self):
      print('# UsersConfig ready')
      from . import signals
