<template>
  <div>
    <h1>Registration</h1>
    <div class="row">
      <div class="col-md-6 col-centered">
        <SignupForm/>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import SignupForm from '@/components/SignupForm.vue';

export default Vue.extend({
  name: 'signup',
  components: {
    SignupForm,
  },
});
</script>

<style scoped lang="scss">
.col-centered {
  margin: 0 auto;
}
</style>