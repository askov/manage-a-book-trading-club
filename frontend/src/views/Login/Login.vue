<template>
  <div>
    <div class="row">
      <div class="shadow standard-form col-10 mt-5 px-0 mx-auto rounded">
        <LoginForm/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import LoginForm from '@/components/LoginForm/index.vue';

export default Vue.extend({
  name: 'login',
  components: {
    LoginForm,
  },
});
</script>

<style scoped lang="scss">
</style>

