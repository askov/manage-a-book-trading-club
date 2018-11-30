import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home/Home.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/Signup/Signup.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login/Login.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile/Profile.vue'),
    },
    {
      path: '/404',
      name: '404',
      component: () => import('./views/NotFound/NotFound.vue'),
    }, {
      path: '*',
      redirect: '/404',
    },
  ],
});

router.afterEach((to, from) => {
  document.title = `mbtc - ${to.name}`;
});

export default router;
