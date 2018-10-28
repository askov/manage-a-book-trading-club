<template>
  <div id="app">
    <!-- primary, success, info, warning, danger, dark, or light. -->
    <b-navbar toggleable="md" type="dark" variant="success">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <router-link to="/">
        <b-navbar-brand>Book trading club</b-navbar-brand>
      </router-link>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <router-link to="/signup" class="nav-link">Signup</router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>


<style lang="scss">
</style>
