import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BootstrapVue from 'bootstrap-vue';

Vue.config.productionTip = false;

// Css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Plugins
Vue.use(BootstrapVue);
import { Navbar } from 'bootstrap-vue/es/components';
Vue.use(Navbar);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
