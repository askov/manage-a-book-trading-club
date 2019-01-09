<template>
  <b-form @submit.prevent="onSubmit" novalidate autocomplete="off" class="bg-light p-4 rounded">
    <b-form-group>
      <b-alert
        variant="danger"
        dismissible
        fade
        :show="showDismissibleAlert"
        @dismissed="showDismissibleAlert=false"
      >{{alertText}}</b-alert>
      <div class="text-center">
        <UserAvatar :avatar="form.avatar" :editable="true"/>
      </div>
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
import UserAvatar from '@/components/UserAvatar/UserAvatar.vue';
import apiService from '@/services/api.service';

import { debounce } from 'lodash';

const DEBOUNCE_DELAY = 1000;

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
  alertText: string;
  form: UserProfileForm;
}

export default Vue.extend({
  name: 'ProfileForm',
  components: {
    UserAvatar,
  },
  data(): ComponentData {
    return {
      showDismissibleAlert: false,
      alertText: '',
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
  created() {
    this.$root.$on('image-change-acceptable', (fd: FormData) => {
      console.log('#image changed', fd);
      this.onImageChange(fd);
      this.showDismissibleAlert = false;
    });
    this.$root.$on('image-change-unacceptable', (error: string) => {
      this.alertText = error;
      this.showDismissibleAlert = true;
    });
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
      user.dispatchPatchProfile({
        city: this.form.city,
        state: this.form.state,
        first_name: this.form.firstName,
        last_name: this.form.lastName,
      });

      // apiService.patchProfile({
      //   city: this.form.city,
      //   state: this.form.state,
      //   first_name: this.form.firstName,
      //   last_name: this.form.lastName,
      // });
    }, DEBOUNCE_DELAY),
    onImageChange(fd: FormData): void {
      user.dispatchPatchProfile(fd);
      // apiService.patchProfile(fd).then((res: any) => {
      //   this.form.avatar = res.data.avatar;
      // });
      // const selectedImage = event.target.files[0];
      // if (selectedImage) {
      //   if (selectedImage.size > 1024 * 50) {
      //     console.warn('image is too large');
      //     this.showDismissibleAlert = true;
      //   } else {
      //     const fd = new FormData();
      //     fd.append('avatar', selectedImage, selectedImage.name);
      //     apiService.patchProfile(fd).then((res: any) => {
      //       this.form.avatar = res.data.avatar;
      //     });
      //   }
      // }
    },
    // handleImageLoadError(event: any) {
    //   console.log('#error!');
    //   event.target.classList.add('avatar-placeholder');
    // },
    // handleImageLoaded() {
    //   console.log('#load!');
    //   // this.isLoaded = true;
    // },
  },
  watch: {
    profile(newVal, oldVal) {
      this.populateFormFields(newVal);
    },
  },
});
</script>

<style scoped lang="scss">
</style>
