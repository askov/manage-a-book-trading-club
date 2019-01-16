<template>
  <div id="app"
       class="app-wrapper">
    <div class="app-content">
      <div class="container-fluid">
        <TopNavbar />
      </div>

      <transition name="fade"
                  mode="out-in">

        <router-view />
      </transition>
    </div>
    <div class="app-footer">
      <div class="container-fluid p-0">
        <Footer/>
      </div>
    </div>

  </div>


  <!-- <div id="app" class="container-fluid">
    <TopNavbar/>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div> -->
</template>


<script lang="ts">
  import Vue from 'vue';
  import TopNavbar from '@/components/TopNavbar/TopNavbar.vue';
  import user from '@/store/modules/user';
  import Footer from '@/components/Footer/Footer.vue';


  export default Vue.extend({
    name: 'appRoot',
    components: {
      TopNavbar,
      Footer,
    },
    mounted() {
      if (user.isLoggedIn) {
        user.dispatchObtainProfile();
      }
    },
  });

</script>

<style lang="scss">



</style>
