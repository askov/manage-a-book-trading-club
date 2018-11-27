import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from '@/store/actions/auth';
// import Vue from 'vue'
import apiService from '@/services/api.service';
import { ActionTree, ActionContext } from 'vuex';
import { getStoreBuilder } from 'vuex-typex';


const initialState: UserState = {
  status: '',
  profile: undefined,
};

const b = getStoreBuilder<RootState>().module("userState", initialState);

// # Getters
const getProfileGetter = b.read((s: UserState): UserProfile | undefined => s.profile, 'getProfile');
const isProfileLoadedGetter = b.read((s: UserState): boolean => s.profile !== undefined, 'isProfileLoaded');

// const mutations = {
//   [LOGIN_REQUEST]: (s: UserState): void => {
//     s.status = 'pending';
//   },
//   [LOGIN_SUCCESS]: (s: UserState, res: object): void => {
//     console.log('#LOGIN_SUCCESS', res);
//     s.status = 'success';
//   },
//   [LOGIN_ERROR]: (s: UserState, err: object): void => {
//     console.log('#LOGIN_ERROR', err);
//     s.status = 'error';
//   },
//   [LOGOUT]: (s: UserState) => {
//     s.profile = undefined;
//   },

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
// const userModule = getStoreBuilder<RootState>('userModule', initialState);

// const moduleBuilder = storeBuilder.module<UserState>("basket", { items: [] });

// const getters = {
//   getProfile: (s: UserState): UserProfile | undefined => s.profile,
//   isProfileLoaded: (s: UserState): boolean => s.profile !== undefined,
// };

// const actions: ActionTree<UserState, RootState> = {
//   [LOGIN_REQUEST]: async ({ commit, dispatch }, form: UserLoginForm) => {
//     // commit(LOGIN_REQUEST)
//     console.log('#commit', commit);
//     commit(LOGIN_REQUEST, await apiService.logIn(form));
//   },
// };

// const mutations = {
//   [LOGIN_REQUEST]: (s: UserState): void => {
//     s.status = 'pending';
//   },
//   [LOGIN_SUCCESS]: (s: UserState, res: object): void => {
//     console.log('#LOGIN_SUCCESS', res);
//     s.status = 'success';
//   },
//   [LOGIN_ERROR]: (s: UserState, err: object): void => {
//     console.log('#LOGIN_ERROR', err);
//     s.status = 'error';
//   },
//   [LOGOUT]: (s: UserState) => {
//     s.profile = undefined;
//   },
// };



// export default {
//   state,
//   getters,
//   actions,
//   mutations,
// };

// Example
// https://gist.github.com/ChristopherKiss/cda423131c020e7f5d80e7015b1fc790
export default {
  // state
  // get state() { return stateGetter() },

  // // getters (wrapped as real getters)
  // get items() { return itemsGetter() },
  // get numberOfItems() { return numberOfItemsGetter() },

  // // mutations
  // commitAppendItem: b.commit(appendItem),
  // commitSetIsLoading: b.commit(setIsLoading),

  // // actions
  // dispatchRestoreSavedBasket: b.dispatch(restoreSavedBasket)
}