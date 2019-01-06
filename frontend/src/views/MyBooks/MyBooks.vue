<template>
  <div class="container mt-5">
    <b-input-group class="mb-3">
      <b-form-input v-model="searchTerm" @keydown.native="handleBookSearch" />
      <b-input-group-append>
        <b-btn size="sm" text="Button" variant="success">Search</b-btn>
      </b-input-group-append>
    </b-input-group>
    <b-form-text>Discover books using the Google Books API and add them to your personal collection</b-form-text>

    <b-pagination @change="handlePageChange" align="center" class="mt-3" v-if="totalItems > 0" size="sm" :total-rows="totalItems" :per-page="PAGE_SIZE"></b-pagination>
    <br>
    <h6 class="text-light" v-if="totalItems > 0">Found {{totalItems}}</h6>
    <ul class="books-container mt-3">
      <li v-for="book in books" :key="book.id">
        <BookCard :image="book.imageThumbnail"/>
      </li>
    </ul>


  </div>
    <!-- TODO -->

</template>

<script lang="ts">
import Vue from 'vue';
import apiService from '@/services/api.service';
import BookCard from '@/components/BookCard/BookCard.vue';

import { debounce, get } from 'lodash';

const DEBOUNCE_DELAY = 700;

interface ComponentData {
  searchTerm: string;
  startIndex: number;
  totalItems: number;
  books: object[];
}

export default Vue.extend({
  name: 'MyBooks',
  components: {
    BookCard,
  },
  computed: {
    PAGE_SIZE: () => 10,
  },
  data(): ComponentData {
    return {
      searchTerm: '',
      startIndex: 0,
      totalItems: 0,
      books: [],
    };
  },
  methods: {
    handleBookSearch: debounce(function(this: any) {
      this.searchBooks();
      // if (this.searchTerm) {
      //   apiService.googleBookApiSearch(this.searchTerm).then((res) => {
      //     console.log('res', res.data);
      //     const books = res.data.items;
      //     books.forEach((el: any) => {
      //       el.imageThumbnail = get(el, 'volumeInfo.imageLinks.thumbnail', '');
      //     });
      //     this.books = books;
      //     this.totalItems = res.data.totalItems;
      //   });
      // }
    }, DEBOUNCE_DELAY),
    searchBooks() {
      if (this.searchTerm) {
        apiService.googleBookApiSearch(this.searchTerm, this.startIndex).then((res) => {
          console.log('res', res.data);
          const books = res.data.items;
          if (Array.isArray(books)) {
            books.forEach((el: any) => {
              el.imageThumbnail = get(el, 'volumeInfo.imageLinks.thumbnail', '');
            });
            this.books = books;
            this.totalItems = res.data.totalItems;
          }
        });
      }
    },
    handlePageChange(pageNum: number) {
      console.log('#change!!', pageNum);
      this.startIndex = this.PAGE_SIZE * (pageNum - 1);
      this.searchBooks();
    },
  },
});
</script>

<style scoped lang="scss">
.books-container {
  list-style: none;
  padding: 0;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(128px, 1fr));
}
</style>
