

if __name__ == '__main__':
    import os, django, sys
    from django.core import management
    from django.core.management.commands import loaddata

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mbtc.settings")
    django.setup()


    print('Generating fixtures', sys.argv)

    try:
        if sys.argv[1] == 'generate':
            from users.fixtures.create_user_fixtures import UserFixtures
            from books.fixtures.create_book_fixtures import BookFixtures
            uf = UserFixtures(sys.argv[2])
            bf = BookFixtures(sys.argv[2])
            uf.generate()
            bf.generate()
    except IndexError:
        pass

    management.call_command('flush', verbosity=1, interactive=False)
    management.call_command('loaddata', 'users', verbosity=1)

    from users.models import Profile
    from files.fixtures.create_file_fixtures import FileFixtures

    FileFixtures.copy_avatar_file()

    Profile.objects.all().delete()
    management.call_command('loaddata', 'avatars', verbosity=1)
    management.call_command('loaddata', 'profiles', verbosity=1)
    management.call_command('loaddata', 'books', verbosity=1)


