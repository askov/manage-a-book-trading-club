<template>
  <footer class="row text p-5 text-secondary p-footer">
    <div class="w-100">
      <div class="d-flex justify-content-center w-100">
        <a href="https://github.com/askov" class="mr-2 text-light"
          target="_blank"><span class="fab fa-github fa-2x social-button-mini"></span></a>
        <a href="https://www.freecodecamp.com/aleks-askov" class="mr-2 text-light"
          target="_blanket"><span class="fab fa-free-code-camp fa-2x social-button-mini"></span></a>
        <a href="https://twitter.com/AleksandrAskov" class="text-light"
          target="_blanket"><span class="fab fa-twitter fa-2x social-button-mini"></span></a>
      </div>

      <!-- <div>33</div> -->
      <p class="w-100 text-center">This page was created by <a href="https://www.freecodecamp.com/aleks-askov"
           target="_blanket">Alexander Askov</a> &copy; {{year}}</p>
    </div>

  </footer>
</template>

<script lang="ts">
  import Vue from 'vue';


  export default Vue.extend({
    name: 'Footer',
    data(): {
      year: number,
    } {
      return {
        year: new Date().getFullYear(),
      };
    },

  });

</script>

<style scoped
       lang="scss">
  .p-footer {
    background-color: #161616;
  }

</style>
