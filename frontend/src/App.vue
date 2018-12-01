<template>
  <div id="app" class="container-fluid">
    <b-navbar toggleable="md" type="dark" variant="success" class="row">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <router-link to="/">
        <b-navbar-brand>
          <img class="mbtc-logo" src="@/assets/books-logo.svg" alt="book trading club">
          <span>Book trading club</span>
        </b-navbar-brand>
      </router-link>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <router-link to="/signup" class="nav-link">Register</router-link>
          <router-link to="/login" class="nav-link">Log in</router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>


<style lang="scss">

.mbtc-logo {
  height: 30px;
  margin-right: 5px;
  & + span {
    text-transform: capitalize;
  }
}

</style>
