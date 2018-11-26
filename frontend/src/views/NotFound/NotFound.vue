<template>
  <!-- <h1>404</h1> -->
  <div class="page-not-found-container">
    <h1 class="header-404"><b-badge>404</b-badge></h1>
    <p>Oops! That page couldn't be found.</p>
    <p><router-link to="/">Home</router-link></p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'NotFound',
});
</script>

<style scoped lang="scss">
.page-not-found-container {
  text-align: center;
  h1 {
    font-size: 120px;
    text-align: center;
    margin-top: 50px;
  }
}
// .header-404 {
//   font-size: 120px;
//   text-align: center;
//   margin-top: 50px;
// }
</style>
