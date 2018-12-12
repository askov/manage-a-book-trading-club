<template>
  <b-form @submit.prevent="onSubmit" novalidate autocomplete="off" class="bg-light p-4 rounded">
    <b-form-group label="City:" label-for="profileFormCity">
      <b-form-input
        id="profileFormCity"
        v-model="form.city"
        @keydown.native="handleProfileChange"
        placeholder="Enter your city"
      ></b-form-input>
    <b-form-group label="State:" label-for="profileFormState">
      <b-form-input
        id="profileFormState"
        v-model="form.state"
        @keydown.native="handleProfileChange"
        placeholder="Enter your state"
      ></b-form-input>
    </b-form-group>
    </b-form-group>
    <b-form-group label="First name:" label-for="profileFormFirstName">
      <b-form-input
        id="profileFormFirstName"
        v-model="form.firstName"
        @keydown.native="handleProfileChange"
        placeholder="Enter your first name"
      ></b-form-input>
    </b-form-group>
    <b-form-group label="Last name:" label-for="profileFormLastName">
      <b-form-input
        id="profileFormLastName"
        v-model="form.lastName"
        @keydown.native="handleProfileChange"
        placeholder="Enter your last name"
      ></b-form-input>
    </b-form-group>
    <b-form-group label="Email:" label-for="profileFormEmail">
      <b-form-input
        disabled
        id="profileFormEmail"
        v-model="form.email"
        @keydown.native="handleProfileChange"
        placeholder="Enter your email"
      ></b-form-input>
    </b-form-group>
  </b-form>
</template>

<script lang="ts">
import Vue from 'vue';
import user from '@/store/modules/user';
import apiService from '@/services/api.service';

import { debounce } from "lodash";

const DEBOUNCE_DELAY =  1000;


interface UserProfileForm {
  city: string;
  state: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
}

interface ComponentData {
  form: UserProfileForm,
}

export default Vue.extend({
  name: 'ProfileForm',
  data(): ComponentData {
    return {
      form: {
        city: '',
        state: '',
        email: '',
        firstName: '',
        lastName: '',
        username: '',
      },
    };
  },
  mounted() {
    // BUG with input event: https://github.com/bootstrap-vue/bootstrap-vue/issues/1881
    this.populateFormFields(user.getProfile);
  },
  computed: {
    profile() {
      return user.getProfile;
    }
  },
  methods: {
    populateFormFields(profile: UserProfileResponse): void {
      if (!profile) return;
      this.form.city = profile.city;
      this.form.state = profile.state;
      this.form.email = profile.email;
      this.form.firstName = profile.first_name;
      this.form.lastName = profile.last_name;
    },
    handleProfileChange: debounce(function() {
      console.log('#handleProfileChange');
      apiService.patchProfile({
        city: this.form.city,
        state: this.form.state,
        first_name: this.form.firstName,
        last_name: this.form.lastName,
      });
    }, DEBOUNCE_DELAY),

  },
  watch: {
    profile (newVal, oldVal) {
      this.populateFormFields(newVal);
    },
  },
});
</script>

<style scoped lang="scss">
</style>
