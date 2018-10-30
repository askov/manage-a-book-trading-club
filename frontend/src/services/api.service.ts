import http from '@/services/http.service';

interface UserRegistrationForm {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
}

export default {
  new(form: UserRegistrationForm): Promise<object> {
    return http.post('auth/register/', form);
  },
};
