


import os
from pathlib import Path
from django.contrib.auth.hashers import make_password
from shutil import copyfile
from pathlib import Path

class FileFixtures():

    def __init__(self):
        pass

    @staticmethod
    def copy_avatar_file():
        src = os.path.dirname(os.path.abspath(__file__)) + '/avatar.jpg'
        dst = os.path.dirname(str(Path(__file__).resolve().parents[1])) + '/media/avatar.jpg'
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        copyfile(src, dst)


if __name__ == '__main__':
    FileFixtures.copy_avatar_file()
