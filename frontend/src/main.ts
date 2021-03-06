import Vue from 'vue';
import store from './store';
import App from './App.vue';
import router from './router';
import BootstrapVue from 'bootstrap-vue';

Vue.config.productionTip = false;

// Scss
import './styles/index.scss';

// Css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Filters
import '@/filters';

// Font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faEye, faEyeSlash);


Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(BootstrapVue);
import { Navbar } from 'bootstrap-vue/es/components';
Vue.use(Navbar);
import VirtualScrollList from 'vue-virtual-scroll-list';

// Virtual scroll
Vue.component('virtual-list', VirtualScrollList);


// Loader
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// Vue.use(Loading);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
