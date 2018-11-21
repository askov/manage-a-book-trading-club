import http from '@/services/http.service';

export default {
  signUp(form: UserRegistrationForm) {
    return http.post('auth/register/', form);
  },

  logIn(form: UserLoginForm) {
    return http.post('auth/login/', form);
  },
};
