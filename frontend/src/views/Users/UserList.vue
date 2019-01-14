<template>
  <div class="container mt-5">
    <h6 class="text-secondary text-center mt-2">
      <b-badge variant="primary">users found: {{totalUsers}}</b-badge>
    </h6>
    <div class="vld-parent bg-light rounded mt-3" v-show="totalUsers > 0 || isLoading">
      <loading
        :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="false"
        :color="'#007bff'"
      ></loading>
      <virtual-list :size="70" :remain="8" class="custom-scroll-1 py-2 px-5" :tobottom="loadMore">
        <UserCard v-for="(user, index) of users" :key="index" :user="user"/>
      </virtual-list>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import UserCard from '@/components/UserCard/UserCard.vue';
import Loading from 'vue-loading-overlay';
import apiService from '@/services/api.service';

const PAGE_SIZE = 10;

export default Vue.extend({
  name: 'userList',
  components: {
    Loading,
    UserCard,
  },
  computed: {
    PAGE_SIZE: () => PAGE_SIZE,
  },
  data(): {
    users: IUserConciseInfo[],
    totalUsers: number,
    isLoading: boolean,
    currentPage: number,
    nextPage: number | null,
  } {
    return {
      users: [],
      totalUsers: 0,
      isLoading: false,
      currentPage: 1,
      nextPage: null,
    };
  },
  mounted() {
    this.getUsers(this.currentPage);
  },
  methods: {
    getUsers(page: number) {
      this.isLoading = true;
      apiService.getUsers(page).then(
        (res: any) => {
          this.users = this.users.concat(res.data.results);
          this.nextPage = res.data.next;
          this.totalUsers = res.data.count;
          this.isLoading = false;
        },
        (err: any) => {
          console.warn('#error loading users');
        }
      );
    },
    loadMore() {
      if (!this.isLoading && this.nextPage) {
        this.currentPage += 1;
        this.getUsers(this.currentPage);
      }
    },
  },
});
</script>

<style scoped lang="scss">
</style>