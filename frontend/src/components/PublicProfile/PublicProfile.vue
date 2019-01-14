<template>
  <div v-if="profile">
    <div class="d-flex">
      <UserAvatar :avatar="profile.avatar"  :title="profile.username"/>
      <div class="ml-5 w-100">
        <div class="border profile-info-row">{{profile.state}} <span class="top-left-label">State</span></div>
        <div class="border profile-info-row">{{profile.first_name}} <span class="top-left-label">First name</span></div>
        <div class="border profile-info-row">{{profile.city}} <span class="top-left-label">City</span></div>
        <div class="border profile-info-row">{{profile.last_name}} <span class="top-left-label">Last name</span></div>
        <div class="border profile-info-row"><router-link :to="{name: 'user-books'}"> <b-badge variant="primary">{{profile.books_added}} </b-badge> Show details </router-link><span class="top-left-label">Books added </span> </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import UserAvatar from '@/components/UserAvatar/UserAvatar.vue';


export default Vue.extend({
  name: 'PublicProfile',
  components: {
    UserAvatar,
  },
  props: {
    profile: {
      type: Object as () => IPublicProfile,
    },
  },
});
</script>

<style scoped lang="scss">
.profile-info-row {
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
  display: block;
  width: 100%;
  // max-width: 400px;
  flex-shrink: 0;
  position: relative;
}
.top-left-label {
  position: absolute;
  top: 0;
  left: 0;
  color: #007bff;
  // background-color: #f8f9fa;
  background: linear-gradient(#f8f9fa 50%, white 50%);
  display: inline-block;
  padding: 0 5px;
  transform: translate(5px, -50%);
  font-size: 10px;
  font-weight: bold;
}
</style>
