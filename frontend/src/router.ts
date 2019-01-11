import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home/Home.vue';
import user from '@/store/modules/user';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/Signup/Signup.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login/Login.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile/Profile.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/users',
      // name: 'users',
      component: () => import('./views/Users/UserIndex.vue'),
      children: [
        {
          path: 'a',
          name: 'user-list',
          component: () => import('./views/Users/UserList.vue'),
        },
        {
          path: ':id(\\d+)',
          name: 'user-details',
          component: () => import('./views/Users/UserDetails.vue'),
        },

      ],
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/book-store',
      name: 'bookStore',
      component: () => import('./views/BookStore/BookStore.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/my-books',
      name: 'myBooks',
      component: () => import('./views/MyBooks/MyBooks.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/404',
      name: '404',
      component: () => import('./views/NotFound/NotFound.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '*',
      redirect: '/404',
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (user.isLoggedIn) {
      next();
    } else {
      next({ name: 'login' });
    }
  } else {
    if (to.name === 'login' && user.isLoggedIn) {
      next({ name: 'home' });
    } else {
      next();
    }
  }
});

router.afterEach((to) => {
  document.title = `mbtc - ${to.name}`;
});

export default router;
