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
};
