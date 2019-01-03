interface Event {
  preventDefault: () => void;
}

interface UserRegistrationForm {
  username: string;
  email: string;
  password: string;
  // passwordConfirm: string;
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


interface UserProfilePatch {
  first_name?: string;
  last_name?: string;
  city?: string;
  state?: string;
}

interface UserProfileResponse {
  first_name: string;
  last_name: string;
  city: string;
  state: string;
  email: string;
  username: string;
  avatar: string;
}


interface UserState {
  status: string;
  token: string | null;
  profile: UserProfileResponse | null;
}

interface LoginFormInterface {
  serverErrors: ServerErrors;
  username: string;
  password: string;
}


type ErrorIndex = 'non_field_errors' | 'username' | 'password';
type ServerErrors = { [k in ErrorIndex]?: string[] };

interface LoginServerResponseSuccess {
  token: string;
}
interface SignupServerResponseSuccess {
  id: number;
  username: string;
  email: string;
  token: string;
}
// interface LoginServerResponseFieldError {
//   username?: string;
//   password?: string;
// }

// interface LoginServerResponseNonFieldError {
//   non_field_errors: Array<string>;
// }

// type LoginServerResponse = LoginServerResponseFieldError | LoginServerResponseNonFieldError;