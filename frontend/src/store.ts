import Vue from 'vue';
import Vuex from 'vuex';
import apiService from '@/services/api.service';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
    newUser({ commit }, user) {
      //    apiService.new(user).then((res) => {
      //   // commit('SET_USER', { res.data }); // commit a mutation that changes the store state
      //   resolve({some: 1});
      // }).catch(() => reject({ some: 2 }));
      return new Promise((resolve, reject) => {

        apiService.new(user).then((res) => {
          // commit('SET_USER', { res.data }); // commit a mutation that changes the store state
          resolve({ some: 1 });
        }).catch(() => reject({ some: 2 }));
      });
    },
  },
});
