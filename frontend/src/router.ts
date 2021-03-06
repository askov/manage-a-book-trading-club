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
      path: '/cabinet',
      name: 'cabinet',
      component: () => import('./views/Cabinet/Cabinet.vue'),
      redirect: {name: 'profile'},
      children: [
        {
          path: 'profile',
          name: 'profile',
          component: () => import('./views/Profile/Profile.vue'),
          meta: {
            bc: 'Profile',
          },
        },
        {
          path: 'trade-requests',
          name: 'tradeRequests',
          component: () => import('./views/TradeRequests/TradeRequests.vue'),
          redirect: 'trade-requests/incoming',
          children: [
            {
              path: 'incoming',
              name: 'incoming-tr',
              component: () => import('./views/TradeRequests/Incoming.vue'),
              meta: {
                bc: 'Incoming',
              },
            },
            {
              path: 'outcoming',
              name: 'outcoming-tr',
              component: () => import('./views/TradeRequests/Outcoming.vue'),
              meta: {
                bc: 'Outcoming',
              },
            },
          ],
          meta: {
            bc: 'Trade requests',
          },
        },
        {
          path: 'book-store',
          name: 'bookStore',
          component: () => import('./views/BookStore/BookStore.vue'),
          meta: {
            bc: 'Book store',
          },
        },
        {
          path: 'my-books',
          name: 'myBooks',
          component: () => import('./views/MyBooks/MyBooks.vue'),
          meta: {
            bc: 'My books',
          },
        },
      ],
      meta: {
        bc: 'Cabinet',
      },
    },
    {
      path: '/users',
      name: 'users',
      redirect: {name: 'user-list'},
      component: () => import('./views/Users/UserIndex.vue'),
      children: [
        {
          path: '',
          name: 'user-list',
          component: () => import('./views/Users/UserList.vue'),
          meta: {
            bc: 'All',
          },
        },
        {
          path: ':userId(\\d+)',
          name: 'user-details',
          redirect: {name: 'user-public-profile'},
          component: () => import('./views/Users/UserDetailsIndex.vue'),
          meta: {
            bc: 'user id',
          },
          children: [
            {
              path: 'books',
              name: 'user-books',
              redirect: {name: 'user-book-list'},
              component: () => import('./views/Users/UserBooksIndex.vue'),
              meta: {
                bc: 'Books',
              },
              children: [
                {
                  path: '',
                  name: 'user-book-list',
                  component: () => import('./views/Users/UserBooks.vue'),
                  meta: {
                    bc: 'All',
                  },
                },
                {
                  path: ':bookId(\\d+)',
                  name: 'user-book-details',
                  component: () => import('./views/Users/UserBookDetails.vue'),
                  meta: {
                    bc: 'book id',
                  },
                },
              ],
            },
            {
              path: 'profile',
              name: 'user-public-profile',
              component: () => import('./views/Users/UserDetails.vue'),
              meta: {
                bc: 'Profile',
              },
            },
          ],
        },
      ],
      meta: {
        requiresAuth: false,
        bc: 'Users',
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
