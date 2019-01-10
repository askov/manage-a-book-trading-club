import { get } from 'lodash';

const GOOGLE_BOOK_API_CHOICE = 'google_book_api';

export default {
  parseGoogeBookList(books: any[]): IGoogleBook[] {
    return books.map((book) => this.pareseGoogleBookObject(book));
  },

  pareseGoogleBookObject(book: any): IGoogleBook {
    return {
      sourceId: get(book, 'volumeInfo.title', ''),
      sourceApi: GOOGLE_BOOK_API_CHOICE,
      title: get(book, 'volumeInfo.title', ''),
      authors: get(book, 'volumeInfo.authors', []).join(', '),
      thumbnailLink: get(book, 'volumeInfo.imageLinks.thumbnail', ''),
      previewLink: get(book, 'volumeInfo.previewLink', ''),
      publishedDate: get(book, 'volumeInfo.publishedDate', ''),
      description: get(book, 'volumeInfo.description', ''),
    };
  },
};
