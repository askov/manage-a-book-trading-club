<template>
  <b-navbar toggleable="md" type="dark" variant="dark" class="row">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <router-link to="/">
      <b-navbar-brand>
        <img class="mbtc-logo" src="@/assets/books-logo.svg" alt="book trading club">
        <span>Book trading club</span>
      </b-navbar-brand>
    </router-link>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav class="ml-auto" v-if="isLoggedIn">
        <router-link to="/profile" class="nav-link">Profile</router-link>
        <b-button variant="link" class="nav-link" @click="logOut()">
          Log out
        </b-button>

      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" v-else>
        <router-link to="/signup" class="nav-link">Register</router-link>
        <router-link to="/login" class="nav-link">Log in</router-link>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import Vue from 'vue';
import user from '@/store/modules/user';






export default Vue.extend({
  name: 'TopNavbar',
  computed: {
    isLoggedIn() {
      return user.isLoggedIn;
    },
  },
  methods: {
    logOut() {
      console.log('#logout');
      user.dispatchLogOut();
    },
  },
  watch: {
  },
});
</script>

<style scoped lang="scss">
.mbtc-logo {
  height: 30px;
  margin-right: 5px;
  & + span {
    text-transform: capitalize;
  }
}
</style>
