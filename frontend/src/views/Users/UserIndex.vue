<template>
  <div>
      <div class="container my-5">
        <BreadCrumbs />
        <router-view/>
      </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import BreadCrumbs from '@/components/BreadCrumbs/index.vue';

export default Vue.extend({
  name: 'userIndex',
  components: {
    BreadCrumbs,
  },

});
</script>

<style scoped lang="scss">
</style>