<template>
  <b-form @submit="onSubmit" novalidate class="needs-validation" autocomplete="off">
    <b-form-group id="signupFormName" label="Name:" label-for="signupFormName">
      <b-form-input
        id="signupFormName"
        type="text"
        v-model="form.name"
        required
        placeholder="Enter name"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="signupFormEmail"
      label="Email address:"
      label-for="signupFormEmail"
      description="We'll never share your email with anyone else."
    >
      <b-form-input
        id="signupFormEmail"
        type="email"
        v-model="form.email"
        required
        placeholder="Enter email"
      ></b-form-input>
    </b-form-group>
    <b-form-group id="signupFormPassword" label="Password:" label-for="signupFormPassword">
      <b-form-input
        id="signupFormPassword"
        type="password"
        v-model="form.password"
        required
        placeholder="Enter password"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="signupFormPasswordConfirm"
      label="Repeat password:"
      label-for="signupFormPasswordConfirm"
    >
      <b-form-input
        id="signupFormPasswordConfirm"
        type="password"
        v-model="form.password"
        required
        placeholder="Repeat password"
      ></b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
  </b-form>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SignupForm',
  data() {
    return {
      form: {
        email: '',
        name: '',
        password: '',
        passwordConfirm: '',
      },
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
