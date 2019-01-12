<template>
  <div class="container mt-5">
    <!-- <router-view></router-view> -->
    <div class="vld-parent bg-light rounded p-4 mt-3" v-show="totalUsers > 0 || isLoading">
        <UserCard v-for="(user, index) of users" :key="index" :user="user"/>

      <!-- <loading
        :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="false"
        :color="'#007bff'"
      ></loading> -->
      <!-- <virtual-list :size="105" :remain="5" class="custom-scroll-1" :tobottom="toBottom">
        <BookCard v-for="(book, index) of books" :key="index" :book="book"/>
      </virtual-list> -->
    </div>
    <!-- <div class="row">
      <div class="shadow standard-form col-10 mt-5 px-0 mx-auto rounded">
        <SignupForm/>
      </div>
    </div> -->
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import UserCard from '@/components/UserCard/UserCard.vue';
import apiService from '@/services/api.service';

export default Vue.extend({
  name: 'userList',
  components: {
    UserCard,
  },
  data(): {
    users: IUserConciseInfo[],
    totalUsers: number,
    isLoading: boolean,
  } {
    return {
      users: [],
      totalUsers: 0,
      isLoading: false,
    }
  },
  mounted() {
    this.getUsers(1);
  },
  methods: {
    getUsers(page: number) {
      apiService.getUsers(page).then(
        (res: any) => {
          console.log('#users', res);
          this.users = res.data.results;
          this.totalUsers = res.data.count;
        },
        (err: any) => {
          console.warn('#error loading users');
        }
      );
    }
  }
});
</script>

<style scoped lang="scss">
</style>