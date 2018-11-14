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
import SignupForm from '@/components/SignupForm.vue';

export default Vue.extend({
  name: 'signup',
  components: {
    SignupForm,
  },
});
</script>

<style scoped lang="scss">
.standard-form {
  max-width: 450px;
}
</style>