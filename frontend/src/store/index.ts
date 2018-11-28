import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { getStoreBuilder } from 'vuex-typex';
// import user from './modules/user';
import './modules/user';

export interface RootState { user: UserState; }

const debug = process.env.NODE_ENV !== 'production';

// const storeBuilder = getStoreBuilder<RootState>();

Vue.use(Vuex);
const store: Store<RootState> = getStoreBuilder<RootState>().vuexStore();
export default store;

// export default new Vuex.Store({
//   modules: {
//     user,
//   },
//   strict: debug,
//   // state: {
//   //   pending: false,
//   //   token: null,
//   // },
//   // mutations: {

//   //   signupFormPosted(state, res) {
//   //     console.log('#res', res);
//   //     state.token = res.data.token;
//   //   },
//   //   loginFormPosted(state, res) {
//   //     console.log('#res', res);
//   //     state.token = res.data.token;
//   //   },
//   // },
//   // actions: {
//   //   async signUp({ commit }, form) {
//   //     commit('signupFormPosted', await apiService.signUp(form));
//   //   },
//   //   async logIn({ commit }, form) {
//   //     commit('loginFormPosted', await apiService.logIn(form));
//   //   },
//   //   // newUser({ commit }, user) {
//   //   //   return new Promise((resolve, reject) => {
//   //   //     apiService.new(user).then((res) => {
//   //   //       resolve({ data: res });
//   //   //     }).catch((err) => {
//   //   //       reject(err.data);
//   //   //     });
//   //   //   });
//   //   // },
//   //   // login(username: string, password: string) {
//   //   //   return new Promise<object>((resolve, reject) => {
//   //   //     apiService.login(username, password).then((res) => {
//   //   //       resolve({ data: res });
//   //   //     }).catch((err) => {
//   //   //       reject(err.data);
//   //   //     });
//   //   //   });
//   //   // },
//   //   // login(name: string, password: string): Promise<object> {
//   //   //   return new Promise((resolve, reject) => {
//   //   //     apiService.login(name, password).then((res) => {
//   //   //       resolve({ data: res });
//   //   //     }).catch((err) => {
//   //   //       reject(err.data);
//   //   //     });
//   //   //   });
//   //   // },
//   // },
// });
