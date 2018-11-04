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
      return new Promise((resolve, reject) => {
        resolve({ some: 1 });
        apiService.new(user).then((res) => {
          resolve({ some: 1 });
        }).catch(() => reject({ some: 2 }));
      });
    },
  },
});
