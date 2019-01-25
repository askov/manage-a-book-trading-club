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
    <b-modal v-model="modal.show" title="New book" @ok="handleAddOk">
      <p class="my-4">
        Do you really want to add this book
        <strong>&laquo;{{modal.text}}&raquo;</strong> to your collection?
      </p>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import apiService from '@/services/api.service';
import lsService from '@/services/localstorage.service';
import BookList from '@/components/BookList/index.vue';
import evb from '@/services/eventBus.service';
import booksService from '@/services/books.service';
import helperService from '@/services/helper.service';

import { debounce, get } from 'lodash';

const DEBOUNCE_DELAY = 800;
const PAGE_SIZE = 40;
const BOOK_SAVE_LIMIT = 500;

interface ComponentData {
  loading: boolean;
  limitReached: boolean;
  modalShow: boolean;
  modal: {
    text: string;
    show: boolean;
    book: IGoogleBook | null;
  };
  searchTerm: string;
  startIndex: number;
  currentPage: number;
  totalItems: number;
  books: object[];
}

export default Vue.extend({
  name: 'BookStore',
  components: {
    BookList,
  },
  mounted() {
    this.$on('list-end-reached', () => {
      if (!this.loading) {
        this.loadMore();
      }
    });
    evb.bus.$on(evb.event.ADD_NEW_BOOK, (book: IGoogleBook) => {
      this.modal.show = true;
      this.modal.text = book.title;
      this.modal.book = book;
    });

    const s = lsService.getLastSearchResults();
    if (s && s.books && s.searchTerm) {
      this.books = s.books;
      this.searchTerm = s.searchTerm;
    }
  },
  computed: {
    PAGE_SIZE: () => PAGE_SIZE,
  },
  data(): ComponentData {
    return {
      loading: false,
      limitReached: false,
      modalShow: false,
      modal: {
        text: '',
        show: false,
        book: null,
      },
      searchTerm: '',
      currentPage: 0,
      startIndex: 0,
      totalItems: 0,
      books: [],
    };
  },
  methods: {
    loadMore() {
      if (!this.limitReached && !this.loading) {
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
            if (Array.isArray(res.data.items)) {
              const books = booksService.parseGoogeBookList(res.data.items);
              this.books = this.books.concat(books);
              this.totalItems = this.books.length;
              this.currentPage = Math.floor(this.totalItems / this.PAGE_SIZE);
              if (this.books.length < BOOK_SAVE_LIMIT) {
                lsService.setLastSearchResults(this.books, this.searchTerm);
              }
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

    handleAddOk() {
      if (this.modal.book) {
        apiService
          .addNewBook(helperService.convertObjectToSnakeCase(
            this.modal.book
          ) as IGoogleBook)
          .then((res: any) => {
            this.$router.push({name: 'myBooks'});
          });
      }
    },
  },
});
</script>

<style scoped lang="scss">
</style>
