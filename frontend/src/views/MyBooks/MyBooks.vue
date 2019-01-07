<template>
  <div class="container mt-5 ">
    <b-input-group class="mb-3">
      <b-form-input v-model="searchTerm" @keydown.native="handleBookSearch" />
      <b-input-group-append>
        <b-btn size="sm" text="Button" variant="success">Search</b-btn>
      </b-input-group-append>
    </b-input-group>
    <b-form-text>Discover books using the Google Books API and add them to your personal collection</b-form-text>

    <div class="bg-light rounded p-4 mt-3" v-if="totalItems > 0">
    <b-pagination @change="handlePageChange" align="center" class="mt-3" v-if="totalItems > 0" size="sm" :total-rows="totalItems" :per-page="PAGE_SIZE" v-model="currentPage"></b-pagination>
    <br>
    <h6 class="text-secondary text-center">Discovered <b-badge variant="success">{{totalItems}}</b-badge></h6>
    <ul class="books-container mt-3 custom-scroll-1 mh-100">
      <li v-for="book in currentBooks" :key="book.id">
        <BookCard :image="book.imageThumbnail" :title="book.title" :previewLink="book.previewLink" :description="book.description"/>
      </li>
      <li class="border border-primary load-more-placeholder" v-if="showLoadMore">
        <b-button class="d-block text-center w-100 h-100" :size="'sm'" :variant="'link'" @click="loadMore">Load more...</b-button>
      </li>
    </ul>
    </div>



  </div>
    <!-- TODO -->

</template>

<script lang="ts">
import Vue from 'vue';
import apiService from '@/services/api.service';
import BookCard from '@/components/BookCard/BookCard.vue';

import { debounce, get } from 'lodash';

const DEBOUNCE_DELAY = 700;
const PAGE_SIZE = 10;

interface ComponentData {
  loading: boolean;
  limitReached: boolean;
  searchTerm: string;
  startIndex: number;
  currentPage: number;
  totalItems: number;
  books: object[];
}

export default Vue.extend({
  name: 'MyBooks',
  components: {
    BookCard,
  },
  computed: {
    PAGE_SIZE: () => PAGE_SIZE,
    showLoadMore() {
      return (this.totalItems > 0) && !this.limitReached && !this.loading;
    },
    currentBooks() {
      return this.books.slice((this.currentPage - 1) * PAGE_SIZE, this.currentPage * PAGE_SIZE);
    },
  },
  data(): ComponentData {
    return {
      loading: false,
      limitReached: false,
      searchTerm: '',
      currentPage: 0,
      startIndex: 0,
      totalItems: 0,
      books: [],
    };
  },
  methods: {
    loadMore() {
      // console.log('#load more');
      this.startIndex += this.PAGE_SIZE;
      this.searchBooks();
    },
    handlePageChange() {
      console.log('#change');
    },
    searchBooks() {
      if (this.searchTerm) {
        this.loading = true;
        apiService.googleBookApiSearch(this.searchTerm, this.startIndex, this.PAGE_SIZE).then((res) => {
          const books = res.data.items;
          if (Array.isArray(books)) {
            books.forEach((el: any) => {
              el.imageThumbnail = get(el, 'volumeInfo.imageLinks.thumbnail', '');
              el.title = get(el, 'volumeInfo.title', '');
              el.previewLink = get(el, 'volumeInfo.previewLink', '');
              el.description = get(el, 'volumeInfo.description', 'description is not available');
            });
            this.books = this.books.concat(books);
            this.totalItems = this.books.length;
            this.currentPage = Math.floor(this.totalItems / this.PAGE_SIZE);
          } else {
            this.limitReached = true;
          }
          this.loading = false;
        });
      }
    },
    resetSearch() {
      this.startIndex = 0;
      this.totalItems = 0;
      this.currentPage = 0;
      this.limitReached = false;
      this.books = [];
    },
    handleBookSearch: debounce(function(this: any) {
      this.resetSearch();
      this.searchBooks();
    }, DEBOUNCE_DELAY),

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
  // height: 50vh;
  // background-color: gold;
  overflow-y: auto;
}
.load-more-placeholder {
  width: 128px;
}
</style>
