<template>
  <div class="container mt-5" v-if="totalBooks">
    <div>
      <b-pagination size="md" v-show="showPagination"
                    :total-rows="totalBooks"
                    align="center"
                    v-model="currentPage"
                    :per-page="10"
                    @change="handlePageChange"></b-pagination>
      <div class="book-container">
        <ConciseBookCard v-for="(book, index) of books"
                         :book="book"
                         :key="index"></ConciseBookCard>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import ConciseBookCard from '@/components/ConciseBookCard/ConciseBookCard.vue';
import apiService from '@/services/api.service';

export default Vue.extend({
  name: 'userBooks',
  components: {
    ConciseBookCard,
  },
  data(): {
    books: IBookResponse[];
    totalBooks: number;
    currentPage: number;
    showPagination: boolean;
    } {
      return {
        books: [],
        totalBooks: 0,
        currentPage: 1,
        showPagination: false,
      };
    },
  mounted() {
    this.getBooks(this.currentPage);
  },
  methods: {
    handlePageChange(page: number) {
      if (page !== this.currentPage) {
        this.getBooks(page);
      }
    },
    getBooks(page: number) {
      apiService.getUserBooks(page, +this.$route.params.id).then((res: any) => {
        this.books = res.data.results;
        this.totalBooks = res.data.count;
        if (res.data.next || res.data.previous) {
          this.showPagination = true;
        }
      }, (err: any) => {
        console.log('#error', err);
      });
    },
  },
});
</script>

<style scoped lang="scss">
</style>