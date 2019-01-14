<template>
  <div class="bg-light rounded p-5">
    <PublicProfile :profile="profile" />
    <router-view/>

  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import apiService from '../../services/api.service';
// import SignupForm from '@/components/SignupForm/SignupForm.vue';
import PublicProfile from '@/components/PublicProfile/PublicProfile.vue';

export default Vue.extend({
  name: 'userDetails',
  components: {
    PublicProfile,
  },
  data(): {
    profile: IPublicProfile | null;
  } {
    return {
      profile: null,
    };
  },
  mounted() {
    console.log('#mounted details', this.$route.params.id);
    apiService.getUserDetails(+this.$route.params.id).then((res: any) => {
      console.log('#success', res);
      this.profile = res.data;
    }, (err: any) => {
      this.$router.push('/404');
    });
  },
});
</script>

<style scoped lang="scss">
</style>