<template>
  <div class="container bg-light rounded p-5 my-5">
    <ul class="nav nav-pills">
      <li class="nav-item" v-for="(link, index) of links" :key="index">
        <!-- Style bug -->
        <!-- <b-nav-item :to="{name: link.name}">{{link.title}}</b-nav-item> -->
        <router-link class="nav-link" :class="{'active': $route.name === link.name}"
                     :to="{name: link.name}">{{link.title}}</router-link>
      </li>
    </ul>
    <div class="py-5">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'TradeRequests',
    data(): {
      links: ILinkItem[];
    } {
      return {
        links: [
          {
            title: 'Incoming',
            name: 'incoming-tr',
          },
          {
            title: 'Outcoming',
            name: 'outcoming-tr',
          },
        ],

      };
    },

  });

</script>

<style scoped
       lang="scss">


</style>
