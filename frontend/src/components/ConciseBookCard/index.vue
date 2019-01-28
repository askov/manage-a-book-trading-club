<template>
  <transition name="fade"
              mode="out-in">
    <div class="concise-book-card shadow">
      <img :src="book.thumbnail_link"
           alt="book-cover"
           @error="handleImageLoadError"
           @click="handleImageClick" />
      <div class="concise-book-card__panel">
        <span role="button"
              class="concise-book-card__btn concise-book-card__btn--offers"
              v-b-tooltip.hover
              title="Offers">todo</span>
        <span role="button"
              class="concise-book-card__btn"
              v-b-tooltip.hover
              :title="book.title + ' Click to learn more'">
          <a :href="book.preview_link"
             target="_blank"
             class="text-white">
            <i class="fas fa-info-circle fa-lg"></i>
          </a>
        </span>
        <span role="button"
              class="concise-book-card__btn"
              v-b-tooltip.hover
              title="Remove book"
              @click="handleRemoveClick(book)">
          <i class="fas fa-trash fa-lg"></i>
        </span>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
  import Vue from 'vue';
  import evb from '@/services/eventBus.service';
  import apiService from '../../services/api.service';


  export default Vue.extend({
    name: 'ConciseBookCard',
    data(): {
      isLoaded: boolean;
    } {
      return {
        isLoaded: false,
      };
    },
    props: {
      book: {
        type: Object as() => IBookResponse,
      },
    },
    methods: {
      handleRemoveClick(book: IBookResponse) {
        evb.bus.$emit(evb.event.REMOVE_BOOK, book);
      },
      handleImageLoadError(event: any) {
        event.target.src = require('@/assets/no_cover_thumb.gif');
      },
      handleImageClick() {
        this.$router.push({
          name: 'user-book-details',
          params: {
            bookId: `${this.book.id}`,
          },
        });
      },
    },
  });

</script>

<style scoped
       lang="scss">
  .concise-book-card {
    width: 128px;
    height: 200px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      cursor: pointer;
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
        color: black;
        border-radius: 50%;
      }
    }
  }

</style>
