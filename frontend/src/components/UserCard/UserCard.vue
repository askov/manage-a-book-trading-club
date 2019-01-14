<template>
  <transition name="fade" mode="out-in">
    <div class="user-card rounded bg-white p-1 d-flex mb-1 shadow">
      <router-link :to="{name: 'user-details', params:{id: user.id}}" class="p-0 d-flex align-items-center">
        <UserAvatar :avatar="user.avatar" :size="'middle'" :title="'Show user details'"/>
        <span class="ml-3">{{user.username}}</span>
      </router-link>
      <div class="text-secondary ml-2 d-flex align-items-center">
        <router-link :to="{name: 'user-books', params: {id: user.id}}"><b-badge variant="primary">books: {{user.books_added}}</b-badge></router-link>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import UserAvatar from '@/components/UserAvatar/UserAvatar.vue';


export default Vue.extend({
  name: 'UserCard',
  components: {
    UserAvatar,
  },
  data(): {
    isLoaded: boolean;
  } {
    return {
      isLoaded: false,
    };
  },
  props: {
    user: {
      type: Object as () => IUserConciseInfo,
    },
  },
  computed: {},
  methods: {
    handleImageLoadError(event: any) {
      event.target.src = require('@/assets/avatar_placeholder.svg');
    },
    handleImageLoaded() {
      this.isLoaded = true;
    },
  },
});
</script>

<style scoped lang="scss">
.user-card {
  height: 67px;
  text-overflow: ellipsis;
  overflow: hidden;
  position: relative;
  &__title {
  }
  &__description {
    font-size: 12px;
    overflow: hidden;
  }
  &__rcol {
    position: relative;
    width: 100%;
    &:after {
      display: block;
      content: '';
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 30px;
      background: linear-gradient(to top, white, transparent);
    }
  }

}
</style>
