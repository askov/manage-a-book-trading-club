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
    <router-view/>
  </div>
</template>


<style lang="scss">
body {
  font-family: 'Gentium Book Basic', serif;
}
.mbtc-logo {
  height: 30px;
  margin-right: 5px;
  & + span {
    text-transform: capitalize;
  }
  // display: inline-block;
  // vertical-align: middle;
}
.standard-form {
  max-width: 300px;
}
.standard-form {
  max-width: 450px;
}
</style>
