<template>
  <b-form @submit.prevent="onSubmit" novalidate autocomplete="off" class="bg-light rounded">
    <div class="px-4 py-3 text-dark">
      <b-form-group label="Name:" label-for="loginFormName" :invalid-feedback="invalidName">
        <b-form-input
          id="loginFormName"
          type="text"
          :class="{ 'is-invalid': $v.form.username.$error }"
          v-model="form.username"
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Password:" label-for="loginFormPassword">
        <b-input-group>
          <b-form-input
            id="loginFormPassword"
            :type="passwordVisibility ? 'text': 'password'"
            :class="{ 'is-invalid': $v.form.password.$error }"
            v-model="form.password"
            placeholder="Enter password"
          ></b-form-input>
          <b-input-group-append>
            <b-btn variant="success" @click="togglePasswordVisibility()">
              <font-awesome-icon icon="eye" v-if="passwordVisibility"/>
              <font-awesome-icon icon="eye-slash" v-else/>
            </b-btn>
          </b-input-group-append>
        </b-input-group>
        <b-form-invalid-feedback v-if="$v.form.password.$error">{{invalidPassword}}</b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="nonFieldErrors">
        {{nonFieldErrors}}
      </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="submit" variant="success" class="w-100 form-submit-button">Log in</b-button>
      <div class="border-top mt-3 pt-2 text-secondary">Don't have your account yet?
        <router-link to="/signup">Register here</router-link>
      </div>
    </div>
  </b-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { validationMixin } from 'vuelidate';
import { required, minLength, sameAs } from 'vuelidate/lib/validators';
import serverRule from '@/validators/serverRule';
import user from '@/store/modules/user';
// import axiosInstance from '@/services/http.service';





interface ComponentData {
  passwordVisibility: boolean;
  form: LoginFormInterface;
}

export default Vue.extend({
  name: 'LoginForm',
  data(): ComponentData {
    return {
      passwordVisibility: false,
      form: {
        serverErrors: {},
        username: '',
        password: '',
      },
    };
  },
  mixins: [validationMixin],
  validations: {
    form: {
      serverErrors: {},
      username: {
        required,
        serverRule: serverRule('username'),
      },
      password: {
        required,
        serverRule: serverRule('password'),
      },
    },
  },
  computed: {
    nonFieldErrors(): string {
      if (this.form.serverErrors.non_field_errors) {
        return this.form.serverErrors.non_field_errors[0];
      } else {
        return '';
      }
    },
    invalidName(): string {
      if (!(this.$v.form as any).username.required) {
        return 'Name is required';
      } else if (!(this.$v.form as any).username.serverRule) {
        return (this.form as any).serverErrors.username[0];
      } else {
        return '';
      }
    },
    invalidPassword(): string {
      if (!(this.$v.form as any).password.required) {
        return 'Password is required';
      } else if (!(this.$v.form as any).password.serverRule) {
        return (this.form as any).serverErrors.password[0];
      } else {
        return '';
      }
    },
  },
  methods: {
    togglePasswordVisibility(): void {
      this.passwordVisibility = !this.passwordVisibility;
    },
    updateServerErrors(errors: ServerErrors): void {
      console.log('#server errors #2', errors);
      this.form.serverErrors = errors;
    },
    clearServerError(field: ErrorIndex): void {
      delete this.form.serverErrors[field];
      delete this.form.serverErrors.non_field_errors;
    },
    onSubmit(evt: Event): void {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      const {serverErrors, ...form} = this.form;
      user.dispatchLogIn(form).then((res) => {
        console.log('#res', res);
        // axiosInstance.setAuthorizationHeaders(res.token);
        user.dispatchObtainProfile();
        this.$router.push('profile');
      } , (err: ServerErrors) => {
        console.log('#err', err);
        this.updateServerErrors(err);
      });
    },
  },
  watch: {
    'form.username'(): void {
      this.clearServerError('username');
    },
    'form.password'(): void {
      this.clearServerError('password');
    },
  },

});
</script>

<style scoped lang="scss">
</style>
