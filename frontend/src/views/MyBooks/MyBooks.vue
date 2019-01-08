<template>
  <div class="container mt-5">
    <b-input-group class="mb-3">
      <b-form-input v-model="searchTerm" @keydown.native="handleBookSearch"/>
      <b-input-group-append>
        <b-btn size="sm" text="Button" variant="success">Search</b-btn>
      </b-input-group-append>
    </b-input-group>
    <b-form-text>Discover books using the Google Books API and add them to your personal collection</b-form-text>
    <BookList :books="books" :isLoading="loading"/>
    <!-- <loading :active.sync="loading" :can-cancel="false" :is-full-page="false" :color="'#007bff'"></loading> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import apiService from '@/services/api.service';
import BookList from '@/components/BookList/BookList.vue';

import { debounce, get } from 'lodash';

const DEBOUNCE_DELAY = 700;
const PAGE_SIZE = 40;

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
    BookList,
  },
  mounted() {
    this.$on('list-end-reached', () => {
      if (!this.loading) {
        this.loadMore();
      }
    });
  },
  computed: {
    PAGE_SIZE: () => PAGE_SIZE,
    showLoadMore() {
      return this.totalItems > 0 && !this.limitReached && !this.loading;
    },
    currentBooks() {
      return this.books.slice(
        (this.currentPage - 1) * PAGE_SIZE,
        this.currentPage * PAGE_SIZE
      );
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
    toBottom() {
      if (!this.loading) {
        this.loadMore();
      }
    },
    loadMore() {
      if (!this.limitReached) {
        this.startIndex += this.PAGE_SIZE;
        this.searchBooks();
      }
    },
    searchBooks() {
      if (this.searchTerm) {
        this.loading = true;
        apiService
          .googleBookApiSearch(this.searchTerm, this.startIndex, this.PAGE_SIZE)
          .then((res) => {
            const books = res.data.items;
            if (Array.isArray(books)) {
              books.forEach((el: any) => {
                el.imageThumbnail = get(
                  el,
                  'volumeInfo.imageLinks.thumbnail',
                  ''
                );
                el.title = get(el, 'volumeInfo.title', '');
                el.previewLink = get(el, 'volumeInfo.previewLink', '');
                el.authors = get(el, 'volumeInfo.authors', []).join(', ');
                el.description = get(
                  el,
                  'volumeInfo.description',
                  'description is not available'
                );
              });
              this.books = this.books.concat(books);
              this.totalItems = this.books.length;
              this.currentPage = Math.floor(this.totalItems / this.PAGE_SIZE);
              if (this.totalItems < this.PAGE_SIZE) {
                this.limitReached = true;
              }
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
</style>
