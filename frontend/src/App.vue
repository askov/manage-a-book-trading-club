<template>
  <div id="app" class="container-fluid">
    <TopNavbar/>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import TopNavbar from '@/components/TopNavbar/TopNavbar.vue';
import user from '@/store/modules/user';


export default Vue.extend({
  name: 'appRoot',
  components: {
    TopNavbar,
  },
  mounted() {
    if(user.isLoggedIn) {
      user.dispatchObtainProfile();
    }
  },
});
</script>

<style lang="scss">



</style>
