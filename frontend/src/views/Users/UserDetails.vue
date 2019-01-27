<template>
  <div class="py-5">
    <PublicProfile :profile="profile" />
    <router-view/>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import apiService from '../../services/api.service';
import PublicProfile from '@/components/PublicProfile/index.vue';

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
    apiService.getUserDetails(+this.$route.params.userId).then((res: any) => {
      this.profile = res.data;
    }, (err: any) => {
      this.$router.push({name: '404'});
    });
  },
});
</script>

<style scoped lang="scss">
</style>