<template>
  <transition name="fade" mode="out-in">
    <div class="concise-book-card shadow">
      <img :src="book.thumbnail_link" alt="book-cover" @error="handleImageLoadError">
      <div class="concise-book-card__panel">
        <span
          role="button"
          class="concise-book-card__btn concise-book-card__btn--offers"
          v-b-tooltip.hover
          title="Offers"
        >1</span>
        <span
          role="button"
          class="concise-book-card__btn"
          v-b-tooltip.hover
          :title="book.title + ' Click to learn more'"
        >
          <a :href="book.preview_link" target="_blank" class="text-white">
            <i class="fas fa-info-circle fa-lg"></i>
          </a>
        </span>
        <span role="button" class="concise-book-card__btn" v-b-tooltip.hover title="Remove book" @click="handleRemoveClick(book)">
          <i class="fas fa-trash fa-lg"></i>
        </span>
        <!-- <button
          type="button"
          class="concise-book-card__btn i-info-button btn"
          v-b-tooltip.hover
          :title="book.title"
        ></button>
        <button
          type="button"
          class="concise-book-card__btn i-remove-button btn"
          v-b-tooltip.hover
          title="Remove book"
        ></button>-->
      </div>
    </div>
    <!-- <div class="book-card rounded bg-white p-1 mb-1 d-flex">
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
    </div>-->
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import evb from '@/services/eventBus.service';
import apiService from '../../services/api.service';

// interface ComponentData {
//   isLoaded: boolean;
// }


export default Vue.extend({
  name: 'TopNavbar',
  data(): {
    isLoaded: boolean;
  } {
    return {
      isLoaded: false,
    };
  },
  props: {
    book: {
      type: Object as () => IBookResponse,
    },
  },
  // computed: {},
  methods: {
    handleRemoveClick(book: IBookResponse) {
      evb.bus.$emit(evb.event.REMOVE_BOOK, book);
    },
    handleImageLoadError(event: any) {
      event.target.src = require('@/assets/no_cover_thumb.gif');
    },
    // handleImageLoadError(event: any) {
    //   event.target.src = this.getImgUrl();
    // },
    // handleImageLoaded() {
    //   this.isLoaded = true;
    // },
    // getImgUrl() {
    //   return require('@/assets/no_cover_thumb.gif');
    // },
    // handleAddClick(book: any) {
    //   evb.bus.$emit(evb.event.ADD_NEW_BOOK, book);
    //   // this.$refs.addBookRef.show();
    // },
  },
});
</script>

<style scoped lang="scss">
.concise-book-card {
  width: 128px;
  height: 200px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &__panel {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    padding: 0 5px;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 40px;
    // background-color: black;
    opacity: 0.5;
    &:hover {
      opacity: 0.7;
      background-color: black;
    }
  }
  &__btn {
    width: 20px;
    height: 20px;
    margin-left: 6px;
    cursor: pointer;
    color: white !important;
    text-align: center;
    &--offers {
      // background-color: white;
      color: black;
      border-radius: 50%;
    }
  }
}
</style>
