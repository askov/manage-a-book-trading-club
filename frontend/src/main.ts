import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BootstrapVue from 'bootstrap-vue';
import { getStoreBuilder } from 'vuex-typex';
import Vuex from 'vuex';

Vue.config.productionTip = false;

// Scss
import './styles/index.scss';

// Css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


// Font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faEye, faEyeSlash);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(BootstrapVue);
import { Navbar } from 'bootstrap-vue/es/components';
Vue.use(Navbar);

Vue.use(Vuex);

const storeBuilder = getStoreBuilder<RootState>();

new Vue({
  router,
  store: storeBuilder.vuexStore(),
  render: (h) => h(App),
}).$mount('#app');
