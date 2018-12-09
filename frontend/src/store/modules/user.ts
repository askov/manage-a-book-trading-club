import apiService from '@/services/api.service';
import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store';

const TOKEN_STORAGE_KEY = 'token';

const initialState: UserState = {
  status: '',
  profile: undefined,
};

const b = getStoreBuilder<RootState>().module('userState', initialState);

// # State
const stateGetter = b.state();

// # Getters
const getProfileGetter = b.read((s: UserState): UserProfile | undefined => s.profile, 'getProfile');
const isProfileLoadedGetter = b.read((s: UserState): boolean => s.profile !== undefined, 'isProfileLoaded');
const isLoggedInGetter = b.read((s: UserState): boolean => s.profile !== undefined, 'isLoggedIn');

// # Mutations
function requestProcessing(s: UserState) {
  s.status = 'processing';
}

function loginSuccess(s: UserState, res: object) {
  console.log('#LOGIN_SUCCESS', res);
  localStorage.setItem(TOKEN_STORAGE_KEY, res.data.token);
  s.status = 'success';
}

function loginError(s: UserState, err: object) {
  console.log('#LOGIN_ERROR', err);
  s.status = 'error';
}

function logOutSuccess(s: UserState) {
  s.profile = undefined;
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

function obtainProfileSuccess(s: UserState, profile: object) {
  s.profile = profile;
  s.status = 'success';
}

function obtainProfileError(s: UserState) {
  s.profile = undefined;
  s.status = 'error';
}

// # Actions
function logIn(context: BareActionContext<UserState, RootState>, form: UserLoginForm) {
  return new Promise<object>((resolve, reject) => {
    user.commitRequestProcessing();
    apiService.logIn(form).then((res) => {
      user.commitLoginSuccess(res);
      resolve(res.data);
    }).catch((err) => {
      user.commitLoginError(err);
      reject(err);
    });
  });
}

function logOut(context: BareActionContext<UserState, RootState>) {
  user.commitLogOutSuccess();
}

function obtainProfile(context: BareActionContext<UserState, RootState>) {
  return new Promise<object>((resolve, reject) => {
    user.commitRequestProcessing();
    apiService.getProfile().then((res) => {
      console.log('#profile', res.data);
      user.commitObtainProfileSuccess(res.data);
      resolve(res.data);
    }).catch((err) => {
      console.log('#err profile', err);

      // user.commitLoginError(err);
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
  // commitLoginRequest: b.commit(loginRequest),
  // commitProfileRequest: b.commit(profileRequest),
  commitRequestProcessing: b.commit(requestProcessing),
  commitLoginSuccess: b.commit(loginSuccess),
  commitLoginError: b.commit(loginError),
  commitLogOutSuccess: b.commit(logOutSuccess),
  commitObtainProfileSuccess: b.commit(obtainProfileSuccess),
  // # Actions
  dispatchLogIn: b.dispatch(logIn),
  dispatchLogOut: b.dispatch(logOut),
  dispatchObtainProfile: b.dispatch(obtainProfile),
};
export default user;
