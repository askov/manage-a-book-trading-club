<template>
  <b-form @submit.prevent="onSubmit" novalidate autocomplete="off">
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
    <b-button type="submit" variant="primary">Submit</b-button>
  </b-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { validationMixin } from 'vuelidate';
import { required, minLength, sameAs, email } from 'vuelidate/lib/validators';

interface Event {
  preventDefault: () => void;
}

export default Vue.extend({
  name: 'SignupForm',
  data() {
    return {
      form: {},
    };
  },
  mixins: [validationMixin],
  validations: {
    form: {
      email: {
        required,
        email,
      },
      username: {
        required,
        minLength: minLength(4),
      },
      password: {
        required,
        minLength: minLength(8),
      },
      passwordConfirm: {
        sameAsPassword: sameAs('password'),
      },
    },
  },
  methods: {
    onSubmit(evt: Event): void {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      // alert(JSON.stringify(this.form));
      this.$store
        .dispatch('newUser', this.form)
        .then((user: object) => {
          console.log('#new user!');
          // do something after the new user was successfull created
        })

        .catch((error: object) => {
          // do something when something goes wrong
        });
    },
  },
});
</script>

<style scoped lang="scss">
</style>
