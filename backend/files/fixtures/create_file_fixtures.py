


# make_password('qweqwe123')

import os, sys, random
import json
from pathlib import Path
from django.contrib.auth.hashers import make_password
from shutil import copyfile
from pathlib import Path

class FileFixtures():

    def __init__(self):
        pass

    @staticmethod
    def copy_avatar_file():
        src = os.path.dirname(os.path.abspath(__file__) + '/avatar.jpg')
        # TODO
        # dst = os.path.dirname(Path(__file__).parents[1] + '/media')
        # copyfile(src, dst)


if __name__ == '__main__':
    FileFixtures.copy_avatar_file()
