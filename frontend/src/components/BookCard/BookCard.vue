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
      <div class="text-secondary ml-2 d-flex flex-column book-card__rcol">
        <div class="book-card__title">
          <strong>{{title | ellipsis(50)}}</strong>
          <span v-if="authors" class="ml-1">by
            <b-badge variant="info">{{authors | ellipsis(50)}}</b-badge>
          </span>
        </div>
        <div class="book-card__description">{{description}}</div>
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
  height: 105px;
  text-overflow: ellipsis;
  overflow: hidden;
  &__cover {
    width: 64px;
    height: 100%;
    object-fit: cover;
  }
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
