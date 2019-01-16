import axiosInstance from '@/services/http.service';

export default {
  // Helpers
  _createPaginatedUrl(url: string, page: number): string {
    let pUrl = url;
    if (page && page > 1) {
      pUrl += `?page=${page}`;
    }
    return pUrl;
  },
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

  getUserBooks(page: number, userId?: number) {
    const url = userId ? `users/${userId}/books/` : 'books/my/';
    return axiosInstance.http.get(this._createPaginatedUrl(url, page));
  },

  addNewBook(book: IGoogleBook) {
    return axiosInstance.http.post('books/', book);
  },

  removeBook(bookId: number) {
    return axiosInstance.http.delete(`books/${bookId}`);
  },

  // # Trade requests
  getIncomingTradeRequests(page: number) {
    return axiosInstance.http.get(this._createPaginatedUrl('trade_requests/incoming', page));
  },

  getOutcomingTradeRequests(page: number) {
     return axiosInstance.http.get(this._createPaginatedUrl('trade_requests/outcoming', page));
  },
  // TODO: REDO this
  patchTradeRequestStatus(bookId: number, trId: number, status: string) {
    return axiosInstance.http.patch(`/books/${bookId}/trade_requests/${trId}/`, {status});
  },

  // # Users
  getUsers(page: number) {
    return axiosInstance.http.get(this._createPaginatedUrl('users/', page));
  },

  getUserDetails(userId: number) {
    return axiosInstance.http.get(`/users/${userId}`);
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
