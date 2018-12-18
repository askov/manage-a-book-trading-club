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
const getProfileGetter = b.read((s: UserState): UserProfileResponse | null => s.profile, 'getProfile');
const isProfileLoadedGetter = b.read((s: UserState): boolean => s.profile !== null, 'isProfileLoaded');
const isLoggedInGetter = b.read((s: UserState): boolean => s.token !== null, 'isLoggedIn');

// # Mutations
function requestProcessing(s: UserState) {
  s.status = 'processing';
}

function loginSuccess(s: UserState, data: LoginServerResponseSuccess) {
  lsService.setUserToken(data.token);
  s.token = data.token;
  s.status = 'success';
}

function loginError(s: UserState) {
  s.status = 'error';
}

function logOutSuccess(s: UserState) {
  s.profile = null;
  s.token = null;
  lsService.removeUserToken();
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
function logIn(context: BareActionContext<UserState, RootState>, form: UserLoginForm) {
  return new Promise<object>((resolve, reject) => {
    user.commitRequestProcessing();
    apiService.logIn(form).then((res) => {
      user.commitLoginSuccess(res.data);
      axiosInstance.setAuthorizationHeaders(res.data.token);
      resolve(res.data);
    }).catch((err) => {
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
    // console.log('#isLoggedInGetter', isLoggedInGetter());
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
