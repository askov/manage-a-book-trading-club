<template>
  <div class="container my-5">
    <!-- <div class="row px-3">
      <BreadCrumbs />
    </div> -->
    <div class="row px-3">
      <ul class="nav nav-pills">
        <li class="nav-item" v-for="(link, index) of links" :key="index">
          <router-link class="nav-link" :class="{'active': $route.matched.map(el => el.name).includes(link.name)}"
                      :to="{name: link.name}">{{link.title}}</router-link>
        </li>
      </ul>
    </div>
    <div class="row px-3 mt-3">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs.vue';

export default Vue.extend({
  name: 'Cabinet',
  components: {
    BreadCrumbs,
  },
  data(): {
    links: ILinkItem[];
  } {
    return {
      links: [
        {
          title: 'Profile',
          name: 'profile',
        },
        {
          title: 'Trade requests',
          name: 'tradeRequests',
        },
        {
          title: 'My books',
          name: 'myBooks',
        },
        {
          title: 'Book store',
          name: 'bookStore',
        },
      ],

    };
  },
});
</script>

<style scoped lang="scss">

</style>
