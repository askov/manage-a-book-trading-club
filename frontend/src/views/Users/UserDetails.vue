<template>
  <div>
    <h1>DETAILS {{$route.params.id}}</h1>
    <!-- <h1>DETAILS</h1> -->
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
// import SignupForm from '@/components/SignupForm/SignupForm.vue';

export default Vue.extend({
  name: 'userDetails',
  components: {
    // SignupForm,
  },
  mounted() {
    console.log('#mounted', this.$route.params.id);
  },
});
</script>

<style scoped lang="scss">
</style>