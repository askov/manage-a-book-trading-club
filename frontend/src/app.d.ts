interface Event {
  preventDefault: () => void;
}

interface UserRegistrationForm {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
}

interface UserLoginForm {
  username: string;
  password: string;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

interface UserState {
  status: string;
  profile?: UserProfile;
}

interface LoginFormInterface {
  serverErrors: ServerErrors;
  username: string;
  password: string;
}

type ErrorIndex = 'non_field_errors' | 'username' | 'password';
type ServerErrors = { [k in ErrorIndex]?: string[] };
// interface RootState { user: UserState; }

