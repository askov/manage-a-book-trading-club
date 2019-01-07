<template>
  <transition name="fade" mode="out-in">
    <div class="book-card rounded bg-white p-1 mb-1 d-flex">
      <a :href="previewLink" target="_blank">
        <img
          v-show="isLoaded"
          class="book-card__cover shadow"
          :src="image"
          alt="book-cover"
          @load="handleImageLoaded"
          @error="handleImageLoadError"
        >
        <div class="book-card__cover shadow" v-show="!isLoaded"></div>
      </a>
      <!-- v-b-popover.hover="description" -->
      <!-- :placement="'bottom'" -->
      <div class="text-secondary ml-2" :title="title">
        <div>
          <strong>{{title | ellipsis(110)}}</strong>
          <span v-if="authors" class="ml-1">by
            <b-badge variant="info">{{authors}}</b-badge>
          </span>
        </div>
        <div>
          <small>{{description | ellipsis(300)}}</small>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';

interface ComponentData {
  isLoaded: boolean;
}

export default Vue.extend({
  name: 'TopNavbar',
  data(): ComponentData {
    return {
      isLoaded: false,
    };
  },
  props: {
    image: String,
    authors: String,
    previewLink: String,
    title: String,
    description: String,
  },
  computed: {},
  methods: {
    handleImageLoadError(event: any) {
      event.target.src = this.getImgUrl();
    },
    handleImageLoaded() {
      console.log('#loaded');
      this.isLoaded = true;
    },
    getImgUrl() {
      return require('@/assets/no_cover_thumb.gif');
    },
  },
  watch: {},
});
</script>

<style scoped lang="scss">
.book-card {
  height: 100px;
  overflow: hidden;
  &__cover {
    width: 64px;
    height: 100%;
    // height: 205px;
    object-fit: cover;
  }
}
</style>
