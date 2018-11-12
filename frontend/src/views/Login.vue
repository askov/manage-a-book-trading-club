<template>
  <div>
    <h1 class="display-4">Login</h1>
    <LoginForm/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import LoginForm from '@/components/LoginForm.vue';

export default Vue.extend({
  name: 'login',
  components: {
    LoginForm,
  },
});
</script>
