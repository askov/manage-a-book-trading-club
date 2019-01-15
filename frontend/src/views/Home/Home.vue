<template>
  <div class="container-fluid p-0">
      <!-- <h1 class="my-4 text-center text-lg-left light-color text-white">Books in trade</h1> -->
      <div class="row">
        <section class="landing-block-1">
          <div class="w-100 text-center landing-center-block">
          <h1 class="w-100 text-center text-light landing-h1 mb-5">Exchange your books. Simple. Free</h1>
              <!-- <b-btn variant="success" class="landing-register-button">Join us now</b-btn> -->
              <router-link class="btn bg-success text-light landing-register-button" to="/signup">Join us now</router-link>
          </div>
        </section>
      </div>

      <!-- <div class="row text-center text-lg-left" >
        <BookCard v-for="book in books"
                  v-bind:key="book.id"
                  v-bind:book="book"/>
      </div> -->
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



<style scoped
       lang="scss">

.landing-block-1 {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  height: calc(100vh - 54px);
  width: 100%;
  background-image: url(../../assets/library_1.jpg);
  background-size: cover;
  position: relative;
}
.landing-register-button {
  width: 200px;
  font-size: 30px;
  font-family: 'Oswald', sans-serif;
  letter-spacing: 1px;
}
.landing-h1 {
  font-family: 'Oswald', sans-serif;
  letter-spacing: 1px;
  font-size: 5rem;
  text-transform: uppercase;
  margin-top: 100px;
}
.landing-center-block {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%);
}
</style>
