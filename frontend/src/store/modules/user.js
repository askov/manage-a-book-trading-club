import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from '@/store/actions/auth';
// import Vue from 'vue'
import apiService from '@/services/api.service';

const state = { status: '', profile: {} }

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.name,
}

const actions = {
  [LOGIN_REQUEST]: ({commit, dispatch}, form) => {
    commit(LOGIN_REQUEST)
    apiService.logIn(form)
      .then((res) => {
        commit(LOGIN_SUCCESS, res)
      })
      .catch((err) => {
        console.log('#error', err)
        commit(LOGIN_ERROR)
        // dispatch(LOGOUT)
      })
  },
}

const mutations = {
  [LOGIN_REQUEST]: (state) => {
    state.status = 'pending'
  },
  [LOGIN_SUCCESS]: (state, res) => {
    console.log('#success', res);
    state.status = 'success'
  },
  [LOGIN_ERROR]: (state) => {
    state.status = 'error'
  },
  [LOGOUT]: (state) => {
    state.profile = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}