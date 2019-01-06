<template>
  <div class="book-card">
    <img class="book-card__cover" :src="image" alt="book-cover" @error="handleImageLoadError">
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TopNavbar',
  props: {
    image: String,
  },
  computed: {
  },
  methods: {
    handleImageLoadError(event: any) {
      event.target.src = this.getImgUrl();
    },
    getImgUrl() {
      return require('@/assets/no_cover_thumb.gif');
    },
  },
  watch: {
  },
});
</script>

<style scoped lang="scss">
.book-card {
  &__cover {
    width: 128px;
    // height: 180px;
    height: 205px;
    // object-fit: cover;
  }
}
</style>
