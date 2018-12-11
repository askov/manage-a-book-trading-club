<template>
  <div class="shadow standard-form col-10 mt-5 px-0 mx-auto rounded">
    <ProfileForm/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ProfileForm from '@/components/ProfileForm/ProfileForm.vue';

export default Vue.extend({
  name: 'Profile',
  components: {
    ProfileForm,
  },
});
</script>

<style scoped lang="scss">

</style>
