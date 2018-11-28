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

// interface RootState { user: UserState; }

