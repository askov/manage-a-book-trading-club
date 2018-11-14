<template>
  <b-form @submit.prevent="onSubmit" novalidate autocomplete="off" class="bg-light border rounded">
    <div class="bg-primary text-light p-2 text-center rounded-top">
      <h1>Registration</h1>
    </div>
    <div class="px-4 py-3 text-dark">
      <b-form-group id="signupFormName" label="Name:" label-for="signupFormName">
        <b-form-input
          id="signupFormName"
          type="text"
          :class="{ 'is-invalid': $v.form.username.$error }"
          v-model="form.username"
          placeholder="Enter name"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">Name is required</b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="!$v.form.username.minLength"
        >Name must be at least {{$v.form.username.$params.minLength.min}} characters</b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="!$v.form.username.serverRule"
        >{{form.serverErrors.username[0]}}</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="signupFormEmail" label="Email address:" label-for="signupFormEmail">
        <b-form-input
          id="signupFormEmail"
          type="email"
          v-model="form.email"
          :class="{ 'is-invalid': $v.form.email.$error }"
          placeholder="Enter email"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.email.required">Email is required</b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.email.email">Email must be valid</b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.email.serverRule">{{form.serverErrors.email[0]}}</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="signupFormPassword" label="Password:" label-for="signupFormPassword">
        <b-form-input
          id="signupFormPassword"
          type="password"
          v-model="form.password"
          :class="{ 'is-invalid': $v.form.password.$error }"
          placeholder="Enter password"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">Password is required</b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="!$v.form.password.minLength"
        >Password must have at least {{ $v.form.password.$params.minLength.min }} letters.</b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="!$v.form.password.serverRule"
        >{{form.serverErrors.password[0]}}</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        id="signupFormPasswordConfirm"
        label="Repeat password:"
        label-for="signupFormPasswordConfirm"
      >
        <b-form-input
          id="signupFormPasswordConfirm"
          type="password"
          v-model="form.passwordConfirm"
          :class="{ 'is-invalid': $v.form.passwordConfirm.$error }"
          placeholder="Repeat password"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.passwordConfirm.sameAs">Passwords must be identical.</b-form-invalid-feedback>
      </b-form-group>
      <b-button type="submit" variant="primary">Sign me up!</b-button>
      <div class="border-top mt-3 pt-2 text-secondary">Already registered ?
        <router-link to="/login">Login here</router-link>
      </div>
    </div>
  </b-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { validationMixin } from 'vuelidate';
import { required, minLength, sameAs, email } from 'vuelidate/lib/validators';
import serverRule from '@/validators/serverRule';

interface Event {
  preventDefault: () => void;
}

type ErrorIndex = 'email' | 'username' | 'password' | 'passwordConfirm';
type ServerErrors = { [k in ErrorIndex]?: string[] };

interface SignupFormInterface {
  serverErrors: ServerErrors;
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

interface ComponentData {
  form: SignupFormInterface;
}

export default Vue.extend({
  name: 'SignupForm',
  data(): ComponentData {
    return {
      form: {
        serverErrors: {},
        username: 'jack',
        email: 'jack@mail.ru',
        password: 'qweqwe123',
        passwordConfirm: 'qweqwe123',
      },
    };
  },
  mixins: [validationMixin],
  validations: {
    form: {
      serverErrors: {},
      email: {
        required,
        email,
        serverRule: serverRule('email'),
      },
      username: {
        required,
        minLength: minLength(4),
        serverRule: serverRule('username'),
      },
      password: {
        required,
        minLength: minLength(8),
        serverRule: serverRule('password'),
      },
      passwordConfirm: {
        sameAsPassword: sameAs('password'),
      },
    },
  },
  methods: {
    updateServerErrors(errors: ServerErrors): void {
      this.form.serverErrors = errors;
    },
    clearServerError(field: ErrorIndex): void {
      delete this.form.serverErrors[field];
    },

    onSubmit(evt: Event): void {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.$store
        .dispatch('newUser', this.form)
        .then((user: object) => {
          console.log('#new user!');
        })
        .catch((errors: ServerErrors) => {
          console.log('#error catch!!!', errors);
          this.updateServerErrors(errors);
        });
    },
  },
  watch: {
    'form.username'(): void {
      this.clearServerError('username');
    },
    'form.email'(): void {
      this.clearServerError('email');
    },
  },
});
</script>

<style scoped lang="scss">
// .test {
//   // background-color: #fafafa;
//   border: 1px solid #ced4da;
//   padding: 1em;
//   margin-top: 50px;
//   border-radius: 4px;
// }
</style>
