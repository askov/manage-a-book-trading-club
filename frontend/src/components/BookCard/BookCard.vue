<template>
  <div class="book-card">
    <a :href="previewLink" target="_blank">
      <img class="book-card__cover" :src="image" alt="book-cover" @error="handleImageLoadError">
    </a>
    <div
      v-b-popover.hover="description"
      :title="title"
      class="text-secondary"
      :placement="'bottom'"
    >{{title | filterA(16)}}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TopNavbar',
  props: {
    image: String,
    previewLink: String,
    title: String,
    description: String,
  },
  computed: {},
  methods: {
    handleImageLoadError(event: any) {
      event.target.src = this.getImgUrl();
    },
    getImgUrl() {
      return require('@/assets/no_cover_thumb.gif');
    },
  },
  watch: {},
});
</script>

<style scoped
       lang="scss">
.book-card {
  &__cover {
    width: 128px;
    // height: 180px;
    height: 205px;
    // object-fit: cover;
  }
}
</style>
