<template>
  <b-form @submit.prevent="onSubmit" novalidate autocomplete="off" class="bg-light p-4 rounded">
    <b-form-group>
      <b-alert variant="danger"
             dismissible
             fade
             :show="showDismissibleAlert"
             @dismissed="showDismissibleAlert=false">
      Image is too large. File size can't exceed 50 kB
    </b-alert>
      <!-- <b-img v-bind:src="form.avatar" rounded="circle" blank width="100" height="100" alt="user-avatar" center class="mb-3" /> -->
    <img :src="form.avatar" alt="user-avatar" class="profile-avatar shadow" @click="$refs.file.click()" v-b-tooltip.hover title="Click to select your avatar">
    <input type="file" ref="file" style="display: none" @change="onImageChange">
    </b-form-group>
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

import { debounce } from 'lodash';

const DEBOUNCE_DELAY =  1000;


interface UserProfileForm {
  city: string;
  avatar: string;
  state: string;
  email?: string;
  firstName: string;
  lastName: string;
  username?: string;
}

interface ComponentData {
  showDismissibleAlert: boolean;
  form: UserProfileForm;
}

export default Vue.extend({
  name: 'ProfileForm',
  data(): ComponentData {
    return {
      showDismissibleAlert: false,
      form: {
        city: '',
        state: '',
        email: '',
        firstName: '',
        lastName: '',
        username: '',
        avatar: '',
      },
    };
  },
  mounted() {
    // BUG with input event: https://github.com/bootstrap-vue/bootstrap-vue/issues/1881
    this.populateFormFields(user.getProfile);
  },
  computed: {
    profile(): UserProfileResponse | null {
      return user.getProfile;
    },
  },
  methods: {
    populateFormFields(profile: UserProfileResponse | null): void {
      if (profile) {
        this.form.avatar = profile.avatar;
        this.form.city = profile.city;
        this.form.state = profile.state;
        this.form.email = profile.email;
        this.form.firstName = profile.first_name;
        this.form.lastName = profile.last_name;
      }

    },
    handleProfileChange: debounce(function(this: any) {
      console.log('#handleProfileChange');
      apiService.patchProfile({
        city: this.form.city,
        state: this.form.state,
        first_name: this.form.firstName,
        last_name: this.form.lastName,
        // avatar: null TODO

      });
    }, DEBOUNCE_DELAY),
    onImageChange(event: any): void {
      // console.log('#image change!!!!', event.target.files[0].size);
      const selectedImage = event.target.files[0];
      if (selectedImage) {
        if (selectedImage.size > 1024 * 50) {
          console.warn('image is too large');
          this.showDismissibleAlert = true;
        } else {
          const fd = new FormData();
          fd.append('avatar', selectedImage, selectedImage.name);
          apiService.patchProfile(fd).then((res: any) => {
            this.form.avatar = res.data.avatar;
          });
        }
      }
    },
  },
  watch: {
    profile (newVal, oldVal) {
      this.populateFormFields(newVal);
    },
  },
});
</script>

<style scoped lang="scss">
.profile-avatar {
  cursor: pointer;
  width: 110px;
  height: 110px;
  object-fit: contain;
  border-radius: 50%;
  position: relative;
  left: 50%;
  transform: translate(-50%);
}
</style>
