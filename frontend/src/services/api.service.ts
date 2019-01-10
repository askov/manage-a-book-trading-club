import axiosInstance from '@/services/http.service';

export default {
  // # Auth
  signUp(form: UserRegistrationForm) {
    return axiosInstance.http.post('accounts/register/', form);
  },

  logIn(form: UserLoginForm) {
    return axiosInstance.http.post('accounts/login/', form);
  },

  // # Profile
  getProfile() {
    return axiosInstance.http.get('accounts/profile/');
  },

  patchProfile(form: UserProfilePatch | FormData) {
    return axiosInstance.http.patch('accounts/profile/', form);
  },

  // # Books
  getAllBooks() {
    return axiosInstance.http.get('books/');
  },

  getUserBooks() {
    return axiosInstance.http.get('books/my/');
  },

  addNewBook(book: IGoogleBook) {
    return axiosInstance.http.post('books/', book);
  },

  removeBook(bookId: number) {
    return axiosInstance.http.delete(`books/${bookId}`);
  },

  // Google books api
  googleBookApiSearch(q = '', startIndex = 0, maxResults = 10) {
    return axiosInstance.http({
      url: '/volumes',
      method: 'get',
      baseURL: 'https://www.googleapis.com/books/v1',
      params: {
        q,
        startIndex,
        maxResults,
      },
      transformRequest: [
        (data, headers) => {
          delete headers.common.Authorization;
          return data;
        },
      ],
    });
  },
};
