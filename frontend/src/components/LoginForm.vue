<template>
  <b-form @submit.prevent="onSubmit" novalidate autocomplete="off" class="bg-light border rounded">
    <div class="bg-primary text-light p-2 text-center rounded-top">
      <h1>Login</h1>
    </div>
    <div class="px-4 py-3 text-dark">
      <b-form-group label="Name:" label-for="loginFormName">
        <b-form-input
          id="loginFormName"
          type="text"
          :class="{ 'is-invalid': $v.form.username.$error }"
          v-model="form.username"
          placeholder="Enter name"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">Name is required</b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="!$v.form.username.serverRule"
        >{{form.serverErrors.username[0]}}</b-form-invalid-feedback>
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
            <b-btn variant="primary" @click="togglePasswordVisibility()">
              <font-awesome-icon icon="eye" v-if="passwordVisibility"/>
              <font-awesome-icon icon="eye-slash" v-else/>
            </b-btn>
          </b-input-group-append>
        </b-input-group>
        <b-form-invalid-feedback v-if="!$v.form.password.required">Password is required</b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="!$v.form.password.serverRule"
        >{{form.serverErrors.password[0]}}</b-form-invalid-feedback>
      </b-form-group>
      <b-button type="submit" variant="primary">Log in</b-button>
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

interface Event {
  preventDefault: () => void;
}

type ErrorIndex = 'username' | 'password';
type ServerErrors = { [k in ErrorIndex]?: string[] };

interface LoginFormInterface {
  serverErrors: ServerErrors;
  username: string;
  password: string;
}

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
  methods: {
    togglePasswordVisibility(): void {
      this.passwordVisibility = !this.passwordVisibility;
    },
    updateServerErrors(errors: ServerErrors): void {
      this.form.serverErrors = errors;
    },
    clearServerError(field: ErrorIndex): void {
      delete this.form.serverErrors[field];
    },

    onSubmit(evt: Event): void {
      console.log('#submit');
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      // this.$store
      //   .dispatch('newUser', this.form)
      //   .then((user: object) => {
      //     console.log('#new user!');
      //   })
      //   .catch((errors: ServerErrors) => {
      //     console.log('#error catch!!!', errors);
      //     this.updateServerErrors(errors);
      //   });
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
