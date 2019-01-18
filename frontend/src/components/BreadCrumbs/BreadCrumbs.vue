<template>
  <transition name="fade" mode="out-in">
      <b-breadcrumb :items="bc" />
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BreadCrumbs',
  computed: {
    bc(this: any) {
      const keys = Object.keys(this.$route.params);
      const findValueByUrl = (url: string) => {
        let lastK;
        keys.forEach((k) => {
          if (url.endsWith(k + '(\\d+)')) {
            lastK = `${this.$route.params[k]}`;
          }
        });
        return lastK;
      };
      console.log(this.$route.matched);
      return this.$route.matched.map((el: any) => {
        return {
          text: findValueByUrl(el.path) || el.meta.bc,
          to: {
            name: el.name,
          },
        };
      });
    },
  },
});
</script>

<style scoped lang="scss">
</style>
