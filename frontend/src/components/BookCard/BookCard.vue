<template>
  <transition name="fade" mode="out-in">
    <div class="book-card rounded bg-white p-1 mb-1 d-flex">
      <a :href="book.previewLink" target="_blank">
        <img
          v-show="isLoaded"
          class="book-card__cover shadow"
          :src="book.thumbnailLink"
          alt="book-cover"
          @load="handleImageLoaded"
          @error="handleImageLoadError"
        >
        <div class="book-card__cover shadow" v-show="!isLoaded"></div>
      </a>
      <div class="text-secondary ml-2 d-flex flex-column book-card__rcol">
        <div class="book-card__title">
          <strong>{{book.title | ellipsis(50)}}</strong>
          <span v-if="book.authors" class="ml-1">by
            <b-badge variant="info">{{book.authors | ellipsis(50)}}</b-badge>
          </span>
        </div>
        <div class="book-card__description">{{book.description}}</div>
      </div>
      <div class="book-card__add" @click="handleAddClick(book)"></div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import evb from '@/services/eventBus.service';
interface ComponentData {
  isLoaded: boolean;
}

export default Vue.extend({
  name: 'BookCard',
  data(): ComponentData {
    return {
      isLoaded: false,
    };
  },
  props: {
    book: {
      type: Object as () => IGoogleBook,
    },
    // image: String,
    // authors: String,
    // previewLink: String,
    // title: String,
    // description: String,
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
    handleAddClick(book: any) {
      evb.bus.$emit(evb.event.ADD_NEW_BOOK, book);
      // this.$refs.addBookRef.show();
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
  position: relative;
  &__cover {
    width: 64px;
    height: 100%;
    object-fit: cover;
    // position: relative;
    // z-index: 2;
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
  &__add {
    display: none;
    position: absolute;
    cursor: pointer;
    top: 0;
    // left: 67px;
    right: 0;
    width: 50px;
    // width: 100%;
    height: 100%;
    background: url('../../assets/round_plus.svg') no-repeat center;
    background-color: white;
    background-position: center center;
    background-size: 30px;
    opacity: 0.5;
    &:hover {
      opacity: 0.7;
    }
    // background-color: rgba(255, 255, 255, 0.5);
  }
  $p: &;
  &:hover {
    #{$p}__add {
      display: block;
    }
  }
}
</style>
