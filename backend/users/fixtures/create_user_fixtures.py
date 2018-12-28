


# make_password('qweqwe123')

import os, sys, random
import json
from pathlib import Path
from django.contrib.auth.hashers import make_password


class UserFixtures():
    DEFAULT_USER_NUMBER = 10
    DEFAULT_USER_PASSWORD = 'qweqwe123'

    def __init__(self, args):
        try:
            self.n = int(args[0])
        except:
            self.n = self.DEFAULT_USER_NUMBER


    def create_user_fixtures(self, userdata):
        user = {
                    'model': 'auth.user',
                    'pk': userdata['pk'],
                        'fields': {
                            'username': userdata['username'],
                            'email': '{}@mail.com'.format(userdata['username']),
                            'password': make_password(self.DEFAULT_USER_PASSWORD),
                            'is_superuser': userdata.get('is_superuser', False),
                            'is_staff': userdata.get('is_staff', False),
                            'is_active': True
                        }
        }
        profile = {
                      'model': 'users.profile',
                      'pk': userdata['pk'],
                          'fields': {
                              'user': userdata['pk'],
                              'avatar': 1,
                              'first_name': userdata.get('first_name', ''),
                              'last_name': userdata.get('last_name', ''),
                              'city': 'New York City',
                              'state': 'New York',
                          }
        }
        return user, profile


    def create_user_list(self):
        p = os.path.dirname(os.path.abspath(__file__))
        with open(p + '/firstnames/us.txt') as firstnames, open(p + '/surnames/us.txt') as surnames:
            fnames = firstnames.read().splitlines()
            snames = surnames.read().splitlines()
            users_json = []
            profile_json = []
            admin_user, admin_profile = self.create_user_fixtures({
              'pk': 1,
              'username': 'admin',
              'is_superuser': True,
              'is_staff': True,
            })
            users_json.append(admin_user)
            profile_json.append(admin_profile)

            for i in range(2, self.n + 2):
                fname = random.choice(fnames)
                sname = random.choice(snames)
                # User, Profile
                username = '{}.{}.{}'.format(fname.lower(), sname.lower(), random.randint(1, 100))

                admin_user, admin_profile = self.create_user_fixtures({
                    'pk': i,
                    'username': username,
                    'first_name': fname,
                    'last_name': sname,
                })
                users_json.append(admin_user)
                profile_json.append(admin_profile)
            with open(p + '/users.json', 'w') as file_users, open(p + '/profiles.json', 'w') as file_profiles:
                json.dump(users_json, file_users)
                json.dump(profile_json, file_profiles)

if __name__ == '__main__':
    uf = UserFixtures(sys.argv[1:])
    uf.create_user_list()
