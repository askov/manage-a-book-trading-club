import apiService from '@/services/api.service';
import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store';
import axiosInstance from '@/services/http.service';

// const TOKEN_STORAGE_KEY = 'token';
import lsService from '@/services/localstorage.service';

const initialState: UserState = {
  status: '',
  token: lsService.getUserToken(),
  profile: null,
};

const b = getStoreBuilder<RootState>().module('userState', initialState);

// # State
const stateGetter = b.state();

// # Getters
const getProfileGetter = b.read(
  (s: UserState): UserProfileResponse | null => s.profile,
  'getProfile'
);
const isProfileLoadedGetter = b.read(
  (s: UserState): boolean => s.profile !== null,
  'isProfileLoaded'
);
const isLoggedInGetter = b.read(
  (s: UserState): boolean => s.token !== null,
  'isLoggedIn'
);

// # Mutations
function requestProcessing(s: UserState) {
  s.status = 'processing';
}

function requestError(s: UserState) {
  s.status = 'error';
}

function requestSuccess(s: UserState) {
  s.status = 'success';
}
function loginSuccess(s: UserState, data: LoginServerResponseSuccess) {
  lsService.setUserToken(data.token);
  axiosInstance.setAuthorizationHeaders(data.token);
  s.token = data.token;
  s.status = 'success';
}

function loginError(s: UserState) {
  s.status = 'error';
}

function signupError(s: UserState) {
  s.status = 'error';
}

function signupSuccess(s: UserState, data: SignupServerResponseSuccess) {
  lsService.setUserToken(data.token);
  axiosInstance.setAuthorizationHeaders(data.token);
  s.token = data.token;
  s.status = 'success';
}

function logOutSuccess(s: UserState) {
  s.profile = null;
  s.token = null;
  lsService.removeUserToken();
  axiosInstance.clearAuthorizationHeaders();
}

function obtainProfileSuccess(s: UserState, profile: UserProfileResponse) {
  s.profile = profile;
  s.status = 'success';
}

function obtainProfileError(s: UserState) {
  s.profile = null;
  s.status = 'error';
}

// # Actions
function signUp(
  context: BareActionContext<UserState, RootState>,
  form: UserRegistrationForm
) {
  return new Promise<object>((resolve, reject) => {
    user.commitRequestProcessing();
    apiService
      .signUp(form)
      .then((res) => {
        user.commitSignupSuccess(res.data);
        resolve(res.data);
      })
      .catch((err) => {
        user.commitSignupError();
        reject(err);
      });
  });
}
function logIn(
  context: BareActionContext<UserState, RootState>,
  form: UserLoginForm
) {
  return new Promise<object>((resolve, reject) => {
    user.commitRequestProcessing();
    apiService
      .logIn(form)
      .then((res) => {
        user.commitLoginSuccess(res.data);
        // axiosInstance.setAuthorizationHeaders(res.data.token);
        resolve(res.data);
      })
      .catch((err) => {
        user.commitLoginError();
        reject(err);
      });
  });
}

function logOut(context: BareActionContext<UserState, RootState>) {
  axiosInstance.clearAuthorizationHeaders();
  user.commitLogOutSuccess();
}

function obtainProfile(context: BareActionContext<UserState, RootState>) {
  return new Promise<object>((resolve, reject) => {
    user.commitRequestProcessing();
    apiService
      .getProfile()
      .then((res) => {
        // console.log('#profile', res.data);
        user.commitObtainProfileSuccess(res.data);
        resolve(res.data);
      })
      .catch((err) => {
        // console.log('#err profile', err);
        user.commitRequestError();
        reject(err);
      });
  });
}

function patchProfile(
  context: BareActionContext<UserState, RootState>,
  form: UserProfilePatch | FormData
) {
  return new Promise<object>((resolve, reject) => {
    user.commitRequestProcessing();
    apiService
      .patchProfile(form)
      .then((res) => {
        user.commitObtainProfileSuccess(res.data);
        resolve(res.data);
      })
      .catch((err) => {
        user.commitRequestError();
        reject(err);
      });
  });
}
// Example
// https://gist.github.com/ChristopherKiss/cda423131c020e7f5d80e7015b1fc790
const user = {
  // # State
  get state() {
    return stateGetter();
  },

  // # Getters
  get getProfile() {
    return getProfileGetter();
  },
  get isProfileLoaded() {
    return isProfileLoadedGetter();
  },
  get isLoggedIn() {
    return isLoggedInGetter();
  },

  // # Mutations
  commitRequestProcessing: b.commit(requestProcessing),
  commitRequestError: b.commit(requestError),
  commitRequestSuccess: b.commit(requestSuccess),
  commitLoginSuccess: b.commit(loginSuccess),
  commitLoginError: b.commit(loginError),
  commitLogOutSuccess: b.commit(logOutSuccess),
  commitObtainProfileSuccess: b.commit(obtainProfileSuccess),
  commitSignupSuccess: b.commit(signupSuccess),
  commitSignupError: b.commit(signupError),

  // # Actions
  dispatchLogIn: b.dispatch(logIn),
  dispatchLogOut: b.dispatch(logOut),
  dispatchSignUp: b.dispatch(signUp),
  dispatchObtainProfile: b.dispatch(obtainProfile),
  dispatchPatchProfile: b.dispatch(patchProfile),
};
export default user;
