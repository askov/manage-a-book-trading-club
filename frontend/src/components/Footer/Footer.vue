<template>
  <footer class="bg-dark text-secondary">
    created by alex askov {{year}}
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

<style scoped lang="scss">
</style>
