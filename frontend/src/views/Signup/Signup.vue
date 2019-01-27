<template>
  <div>
    <div class="row">
      <div class="shadow standard-form col-10 mt-5 px-0 mx-auto rounded">
        <SignupForm/>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import SignupForm from '@/components/SignupForm/index.vue';

export default Vue.extend({
  name: 'signup',
  components: {
    SignupForm,
  },
});
</script>

<style scoped lang="scss">
</style>