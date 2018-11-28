import apiService from '@/services/api.service';
import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store';

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

// # Mutations
function loginRequest(s: UserState) {
  s.status = 'pending';
}

function loginSuccess(s: UserState, res: object) {
  console.log('#LOGIN_SUCCESS', res);
  s.status = 'success';
}

function loginError(s: UserState, err: object) {
  console.log('#LOGIN_ERROR', err);
  s.status = 'error';
}

function logout(s: UserState) {
  s.profile = undefined;
}

// # Actions
async function logIn(context: BareActionContext<UserState, RootState>, form: LoginFormInterface) {
  console.log('#commit', form);
  return new Promise<object>((resolve, reject) => {
      resolve({ data: 'test' });

    // apiService.login(form.username, form.password).then((res) => {
    //   resolve({ data: res });
    // }).catch((err) => {
    //   reject(err.data);
    // });
  });
  // b.commit(loginRequest);
}
// const actions: ActionTree<UserState, RootState> = {
//   [LOGIN_REQUEST]: async ({ commit, dispatch }, form: UserLoginForm) => {
//     // commit(LOGIN_REQUEST)
//     console.log('#commit', commit);
//     commit(LOGIN_REQUEST, await apiService.logIn(form));
//   },
// };

// Example
// https://gist.github.com/ChristopherKiss/cda423131c020e7f5d80e7015b1fc790
export default {
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

  // # Mutations
  commitLoginRequest: b.commit(loginRequest),
  commitLoginSuccess: b.commit(loginSuccess),
  commitLoginError: b.commit(loginError),
  commitLogout: b.commit(logout),

  // # Actions
  dispatchLogIn: b.dispatch(logIn),
  // dispatchRestoreSavedBasket: b.dispatch(restoreSavedBasket)
};
