


import os, sys, random
import json
import warnings
from django.contrib.auth.hashers import make_password


class UserFixtures():
    DEFAULT_USER_PASSWORD = 'qweqwe123'

    def __init__(self, user_number=10):
        self.USER_ID_RANGE = (2, int(user_number) + 2)

    def create_random_user_data(self, fnames, snames):
        sname = random.choice(snames)
        fname = random.choice(fnames)
        return {
            'fname': fname,
            'sname': sname,
            'username': '{}.{}'.format(fname.lower(), sname.lower()),
        }

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


    def generate(self):
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

            # Uniq username set
            uname_set = set()

            for i in range(*self.USER_ID_RANGE):
                user_data = self.create_random_user_data(fnames, snames)
                generate_attempts = 0
                while(user_data['username'] in uname_set):
                    user_data = self.create_random_user(fnames, snames)
                    generate_attempts += 1
                    if (generate_attempts > 10):
                        warnings.warn('#Unable to generate uniq username')
                        break
                uname_set.add(user_data['username'])

                # User, Profile
                admin_user, admin_profile = self.create_user_fixtures({
                    'pk': i,
                    'username': user_data['username'],
                    'first_name': user_data['fname'],
                    'last_name': user_data['sname'],
                })
                users_json.append(admin_user)
                profile_json.append(admin_profile)
            with open(p + '/users.json', 'w') as file_users, open(p + '/profiles.json', 'w') as file_profiles:
                json.dump(users_json, file_users)
                json.dump(profile_json, file_profiles)

if __name__ == '__main__':
    uf = UserFixtures(sys.argv[1:])
    uf.generate()
