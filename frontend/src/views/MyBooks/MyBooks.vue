<template>
  <div class="container mt-5">
    <b-input-group class="mb-3">
      <b-form-input v-model="searchTerm" @keydown.native="handleBookSearch" />
      <b-input-group-append>
        <b-btn size="sm" text="Button" variant="success">Search</b-btn>
      </b-input-group-append>
    </b-input-group>
    <b-form-text>Discover books using the Google Books API and add them to your personal collection</b-form-text>
  <br>

    <!-- TODO -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import apiService from '@/services/api.service';

import { debounce } from 'lodash';

const DEBOUNCE_DELAY = 700;

interface ComponentData {
  searchTerm: string;
  startIndex: number;
  totalItems: number;
  books: object[];
}

export default Vue.extend({
  name: 'MyBooks',
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
      if (this.searchTerm) {
        console.log('#new book search');
        apiService.googleBookApiSearch(this.searchTerm).then((res) => {
          console.log('res', res.data.items);
          this.books = res.data.items;
        });
      }
    }, DEBOUNCE_DELAY),
  },
});
</script>

<style scoped lang="scss">

</style>
