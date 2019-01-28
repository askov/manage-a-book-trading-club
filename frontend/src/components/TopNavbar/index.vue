<template>
  <b-navbar toggleable="md"
            type="dark"
            variant="dark"
            class="row">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <router-link to="/">
      <b-navbar-brand>
        <img class="mbtc-logo"
             src="@/assets/books-logo.svg"
             alt="book trading club">
        <span class="logo-text">Book exchange</span>
      </b-navbar-brand>
    </router-link>
    <b-collapse is-nav
                id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item to="/users">Users</b-nav-item>
        <b-nav-item to="/">Books</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto"
                    v-if="isLoggedIn">
        <b-nav-item :to="{name: 'profile'}">
          {{username}}
          <UserAvatar class="ml-2"
                      :avatar="avatar"
                      :size="'small'"
                      :title="'My profile'" />
        </b-nav-item>
        <b-nav-item @click="logOut()"
                    class="d-block">Log out</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto"
                    v-else>
        <b-nav-item to="/signup">Register</b-nav-item>
        <b-nav-item to="/login">Log in</b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
  import Vue from 'vue';
  import user from '@/store/modules/user';
  import UserAvatar from '@/components/UserAvatar/index.vue';

  export default Vue.extend({
    name: 'TopNavbar',
    components: {
      UserAvatar,
    },
    computed: {
      isLoggedIn() {
        return user.isLoggedIn;
      },
      username() {
        return user.getProfile && user.getProfile.username;
      },
      avatar() {
        return user.getProfile && user.getProfile.avatar;
      },
    },
    methods: {
      logOut() {
        user.dispatchLogOut();
        this.$router.push({
          name: 'home',
        });
      },
    },
  });

</script>

<style scoped
       lang="scss">
  .mbtc-logo {
    height: 30px;
    margin-right: 5px;

    &+span {
      font-family: 'Oswald', sans-serif;
      font-size: 1.1rem;
      text-transform: uppercase;
    }
  }

</style>
