


# make_password('qweqwe123')

import os, random
import json
import glob
from django.utils import timezone

class BookFixtures():
    BOOKS_PER_USER_RANGE = (2, 5)

    def __init__(self, user_number=10):
        self.USER_ID_RANGE = (2, int(user_number) + 2)
        self.path = os.path.dirname(os.path.abspath(__file__))
        self.current_book_pk = 1

    def increment_book_pk(self):
        self.current_book_pk += 1

    def generate(self):
        books_src = []

        for file in glob.glob(self.path + '/gbooks/*.json'):
            with open(file) as f:
                d = json.load(f)
                books_src += d['items']

        books = []
        for user_id in range(*self.USER_ID_RANGE):
            books_per_user = random.randrange(*self.BOOKS_PER_USER_RANGE)
            for i in range(0, books_per_user):
                gbook = random.choice(books_src)
                book = {
                    'model': 'books.book',
                    'pk': self.current_book_pk,
                    'fields': {
                        'owner': user_id,
                        'source_api': 'google_book_api',
                        'created_at': timezone.now().replace(microsecond=0).isoformat(),
                        'source_id': gbook.get('id', ''),
                        'title': gbook.get('volumeInfo', {}).get('title', ''),
                        'authors': ', '.join(gbook.get('volumeInfo', {}).get('authors', [])),
                        'thumbnail_link': gbook.get('volumeInfo', {}).get('imageLinks', {}).get('thumbnail', ''),
                        'preview_link': gbook.get('volumeInfo', {}).get('previewLink', ''),
                        'published_date': gbook.get('volumeInfo', {}).get('publishedDate', ''),
                    },
                }
                books.append(book)
                self.increment_book_pk()

        with open(self.path + '/books.json', 'w') as file_books:
            json.dump(books, file_books)


if __name__ == '__main__':
    bf = BookFixtures(10)
    bf.generate()
