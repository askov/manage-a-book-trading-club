import axiosInstance from '@/services/http.service';

export default {
  signUp(form: UserRegistrationForm) {
    return axiosInstance.http.post('auth/register/', form);
  },

  logIn(form: UserLoginForm) {
    return axiosInstance.http.post('auth/login/', form);
  },

  getProfile() {
    return axiosInstance.http.get('auth/profile/');
  },

  patchProfile(form: UserProfilePatch | FormData) {
    console.log('#PATCH', form);
    return axiosInstance.http.patch('auth/profile/', form);
  },

  getAllBooks() {
    return axiosInstance.http.get('books/');
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
