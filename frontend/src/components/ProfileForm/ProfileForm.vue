<template>
  <b-form @submit.prevent="onSubmit" novalidate autocomplete="off" class="bg-light p-4 rounded">
    <b-form-group label="City:" label-for="profileFormCity">
      <b-form-input
        id="profileFormCity"
        v-model="form.city"
        placeholder="Enter your city"
      ></b-form-input>
    <b-form-group label="State:" label-for="profileFormState">
      <b-form-input
        id="profileFormState"
        v-model="form.state"
        placeholder="Enter your state"
      ></b-form-input>
    </b-form-group>
    </b-form-group>
    <b-form-group label="Email:" label-for="profileFormEmail">
      <b-form-input
        id="profileFormEmail"
        v-model="form.email"
        placeholder="Enter your email"
      ></b-form-input>
    </b-form-group>
    <b-form-group label="First name:" label-for="profileFormFirstName">
      <b-form-input
        id="profileFormFirstName"
        v-model="form.firstName"
        placeholder="Enter your first name"
      ></b-form-input>
    </b-form-group>
    <b-form-group label="Last name:" label-for="profileFormLastName">
      <b-form-input type="submit"
        id="profileFormLastName"
        v-model="form.lastName"
        placeholder="Enter your last name"
      ></b-form-input>
    </b-form-group>
  </b-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { validationMixin } from 'vuelidate';
import user from '@/store/modules/user';

// import { required, minLength, sameAs } from 'vuelidate/lib/validators';
// import serverRule from '@/validators/serverRule';
// import user from '@/store/modules/user';



interface UserProfileForm {
  city: string;
  state: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
}

interface ComponentData {
  form: UserProfileForm
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
      }
    };
  },
  mixins: [validationMixin],
  validations: {

  },
  computed: {
    profile() {
      return user.getProfile;
    }

  },
  methods: {
    onSubmit(evt: Event): void {
      console.log('#submit');
    },
  },
  watch: {
    profile (newVal, oldVal) {
      if (newVal) {
        this.form.city = newVal.city;
        this.form.state = newVal.state;
        this.form.email = newVal.email;
        this.form.firstName = newVal.first_name;
        this.form.lastName = newVal.last_name;
      }
    },
    form: {
      handler: function(newValue) {
        console.log(newValue);
      },
      deep: true,
    }
  },
});
</script>

<style scoped lang="scss">
</style>
