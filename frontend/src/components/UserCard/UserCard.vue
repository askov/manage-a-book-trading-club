<template>
  <transition name="fade" mode="out-in">
    <div class="user-card rounded bg-white p-1 mb-1 d-flex shadow">
      <router-link :to="{name: 'user-details', params:{id: user.id}}" class="p-0">
        <UserAvatar :avatar="user.avatar" :size="'middle'" :title="'Show user details'"/>
      </router-link>
      <div class="text-secondary ml-2 d-flex align-items-center">
        {{user.username}}
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
  // &__add {
  //   display: none;
  //   position: absolute;
  //   cursor: pointer;
  //   top: 0;
  //   // left: 67px;
  //   right: 0;
  //   width: 50px;
  //   // width: 100%;
  //   height: 100%;
  //   background: url('../../assets/round_plus.svg') no-repeat center;
  //   background-color: white;
  //   background-position: center center;
  //   background-size: 30px;
  //   opacity: 0.5;
  //   &:hover {
  //     opacity: 0.7;
  //   }
  //   // background-color: rgba(255, 255, 255, 0.5);
  // }
  // $p: &;
  // &:hover {
  //   #{$p}__add {
  //     display: block;
  //   }
  // }
}
</style>
