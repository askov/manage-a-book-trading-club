<template>
  <b-form @submit.prevent="onSubmit" novalidate autocomplete="off">

  </b-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { validationMixin } from 'vuelidate';
// import { required, minLength, sameAs } from 'vuelidate/lib/validators';
// import serverRule from '@/validators/serverRule';
// import user from '@/store/modules/user';





// interface ComponentData {
//   passwordVisibility: boolean;
//   form: LoginFormInterface;
// }

export default Vue.extend({
  name: 'ProfileForm',
  // data(): ComponentData {
  //   return {
  //     passwordVisibility: false,
  //     form: {
  //       serverErrors: {},
  //       username: '',
  //       password: '',
  //     },
  //   };
  // },
  mixins: [validationMixin],
  validations: {
    // form: {
    //   serverErrors: {},
    //   username: {
    //     required,
    //     serverRule: serverRule('username'),
    //   },
    //   password: {
    //     required,
    //     serverRule: serverRule('password'),
    //   },
    // },
  },
  computed: {
    // nonFieldErrors(): string {
    //   if (this.form.serverErrors.non_field_errors) {
    //     return this.form.serverErrors.non_field_errors[0];
    //   } else {
    //     return '';
    //   }
    // },
    // invalidName(): string {
    //   if (!(this.$v.form as any).username.required) {
    //     return 'Name is required';
    //   } else if (!(this.$v.form as any).username.serverRule) {
    //     return (this.form as any).serverErrors.username[0];
    //   } else {
    //     return '';
    //   }
    // },
    // invalidPassword(): string {
    //   if (!(this.$v.form as any).password.required) {
    //     return 'Password is required';
    //   } else if (!(this.$v.form as any).password.serverRule) {
    //     return (this.form as any).serverErrors.password[0];
    //   } else {
    //     return '';
    //   }
    // },
  },
  methods: {
    // togglePasswordVisibility(): void {
    //   this.passwordVisibility = !this.passwordVisibility;
    // },
    // updateServerErrors(errors: ServerErrors): void {
    //   console.log('#server errors #2', errors);
    //   this.form.serverErrors = errors;
    // },
    // clearServerError(field: ErrorIndex): void {
    //   delete this.form.serverErrors[field];
    //   delete this.form.serverErrors.non_field_errors;
    // },
    // onSubmit(evt: Event): void {
    //   this.$v.$touch();
    //   if (this.$v.$invalid) {
    //     return;
    //   }
    //   const {serverErrors, ...form} = this.form;
    //   user.dispatchLogIn(form).then((res) => {
    //     console.log('#res', res);
    //     this.$router.push('profile');
    //   } , (err: ServerErrors) => {
    //     console.log('#err', err);
    //     this.updateServerErrors(err);
    //   });
    // },
  },
  watch: {
    // 'form.username'(): void {
    //   this.clearServerError('username');
    // },
    // 'form.password'(): void {
    //   this.clearServerError('password');
    // },
  },
});
</script>

<style scoped lang="scss">
</style>
