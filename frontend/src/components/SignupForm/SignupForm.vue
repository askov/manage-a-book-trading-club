<template>
  <b-form @submit.prevent="onSubmit" novalidate autocomplete="off" class="bg-light border rounded">
    <div class="px-4 py-3 text-dark">
      <b-form-group
        id="signupFormName"
        label="Name:"
        label-for="signupFormName"
        :invalid-feedback="invalidName"
      >
        <b-form-input
          id="signupFormName"
          type="text"
          v-model="form.username"
          placeholder="Enter name"
          :class="{ 'is-invalid': $v.form.username.$error }"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="signupFormEmail"
        label="Email address:"
        label-for="signupFormEmail"
        :invalid-feedback="invalidEmail"
      >
        <b-form-input
          id="signupFormEmail"
          type="email"
          v-model="form.email"
          :class="{ 'is-invalid': $v.form.email.$error }"
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="signupFormPassword"
        label="Password:"
        label-for="signupFormPassword"
      >
        <b-input-group class="flex-wrap">
          <b-form-input
            id="signupFormPassword"
            :type="passwordVisibility ? 'text': 'password'"
            v-model="form.password"
            :class="{ 'is-invalid': $v.form.password.$error }"
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
      </b-form-group>
      <b-form-group
        id="signupFormPasswordConfirm"
        label="Repeat password:"
        label-for="signupFormPasswordConfirm"
      >
        <b-input-group>
          <b-form-input
            id="signupFormPasswordConfirm"
            :type="passwordConfirmVisibility ? 'text': 'password'"
            v-model="form.passwordConfirm"
            placeholder="Repeat password"
            :class="{ 'is-invalid': $v.form.passwordConfirm.$error }"
          ></b-form-input>
          <b-input-group-append>
            <b-btn variant="success" @click="togglePasswordVisibility('confirm')">
              <font-awesome-icon icon="eye" v-if="passwordConfirmVisibility"/>
              <font-awesome-icon icon="eye-slash" v-else/>
            </b-btn>
          </b-input-group-append>
        </b-input-group>
        <b-form-invalid-feedback v-if="$v.form.passwordConfirm.$error">
          {{invalidPasswordConfirm}}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-button type="submit" variant="success" class="w-100 form-submit-button">Sign me up!</b-button>
      <div class="border-top mt-3 pt-2 text-secondary">Already registered ?
        <router-link to="/login">Login here</router-link>
      </div>
    </div>
  </b-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { validationMixin } from 'vuelidate';
import { required, minLength, sameAs, email, ValidationRule } from 'vuelidate/lib/validators';
import serverRule from '@/validators/serverRule';

interface Event {
  preventDefault: () => void;
}

type ErrorIndex = 'non_field_errors' | 'email' | 'username' | 'password' | 'passwordConfirm';
type ServerErrors = { [k in ErrorIndex]?: string[] };

interface SignupFormInterface {
  serverErrors: ServerErrors;
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

interface ComponentData {
  passwordVisibility: boolean;
  passwordConfirmVisibility: boolean;
  form: SignupFormInterface;
}

export default Vue.extend({
  name: 'SignupForm',
  data(): ComponentData {
    return {
      passwordVisibility: false,
      passwordConfirmVisibility: false,
      form: {
        serverErrors: {},
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
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
  computed: {
    invalidName(): string {
      if (!(this.$v.form as any).username.required) {
        return 'Name is required';
      } else if (!(this.$v.form as any).username.minLength) {
        return `Name must be at least ${
          (this.$v.form as any).username.$params.minLength.min
        }`;
      } else if (!(this.$v.form as any).username.serverRule) {
        return (this.form as any).serverErrors.username[0];
      } else {
        return '';
      }
    },
    invalidEmail(): string {
      if (!(this.$v.form as any).email.required) {
        return 'Email is required';
      } else if (!(this.$v.form as any).email.email) {
        return 'Email must be valid';
      } else if (!(this.$v.form as any).email.serverRule) {
        return (this.form as any).serverErrors.email[0];
      } else {
        return '';
      }
    },
    invalidPassword(): string {
      if (!(this.$v.form as any).password.required) {
        return 'Password is required';
      } else if (!(this.$v.form as any).password.minLength) {
        return `Password must be at least ${
          (this.$v.form as any).password.$params.minLength.min
        }`;
      } else if (!(this.$v.form as any).password.serverRule) {
        return (this.form as any).serverErrors.password[0];
      } else {
        return '';
      }
    },
    invalidPasswordConfirm(): string {
      if (!(this.$v.form as any).passwordConfirm.sameAs) {
        return 'Passwords must be identical';
      } else {
        return '';
      }
    },
  },
  methods: {
    togglePasswordVisibility(field: string): void {
      if (field === 'confirm') {
        this.passwordConfirmVisibility = !this.passwordConfirmVisibility;
      } else {
        this.passwordVisibility = !this.passwordVisibility;
      }
    },
    updateServerErrors(errors: ServerErrors): void {
      console.log('#server errors #1', errors);
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
        .dispatch('signUp', this.form)
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
</style>
