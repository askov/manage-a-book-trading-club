<template>
  <div class="home container">
      <h1 class="my-4 text-center text-lg-left light-color text-white">Books in trade</h1>

      <div class="row text-center text-lg-left" >
        <BookCard v-for="book in books"
                  v-bind:key="book.id"
                  v-bind:book="book"/>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BookCard from '@/components/BookCard/BookCard.vue';
import apiService from '@/services/api.service';

interface Book {
  id: number;
  title: string;
  authors: string;
  thumbnail_link: string;
  preview_link: string;
  published_date: string;
  username: string;
}

interface ComponentData {
  books: Book[];
}
export default Vue.extend({
  name: 'home',
  data(): ComponentData {
    return {
      books: [],
    };
  },
  components: {
    BookCard,
  },
  mounted() {
    // apiService.getAllBooks().then((res) => {
    //   this.books = res.data.results;
    //   console.log('$books', res);
    // });
  },
});
</script>
