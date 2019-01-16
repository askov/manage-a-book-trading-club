<template>
    <!-- <PublicProfile :profile="profile" /> -->
    <router-view></router-view>
</template>


<script lang="ts">
import Vue from 'vue';
// import apiService from '../../services/api.service';
// import PublicProfile from '@/components/PublicProfile/PublicProfile.vue';

export default Vue.extend({
  name: 'UserDetailsIndex',
  components: {
    // PublicProfile,
  },
  // data(): {
  //   profile: IPublicProfile | null;
  // } {
  //   return {
  //     profile: null,
  //   };
  // },
  // mounted() {
  //   apiService.getUserDetails(+this.$route.params.id).then((res: any) => {
  //     this.profile = res.data;
  //   }, (err: any) => {
  //     this.$router.push('/404');
  //   });
  // },
});
</script>

<style scoped lang="scss">
</style>