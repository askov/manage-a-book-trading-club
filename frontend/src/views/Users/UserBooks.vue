<template>
  <div class="container mt-5">
    <!-- <h1>Books added</h1> -->
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
// import UserCard from '@/components/UserCard/UserCard.vue';
import ConciseBookCard from '@/components/ConciseBookCard/ConciseBookCard.vue';
import apiService from '@/services/api.service';

export default Vue.extend({
  name: 'userBooks',
  components: {
    // UserCard,
    ConciseBookCard,
  },
  data(): {
    books: IBookResponse[];
    totalBooks: number;
    currentPage: number;
    showPagination: boolean;
    // modal: {
    //   text: string;
    //   show: boolean;
    //   book: IBookResponse | null;
    // };
    } {
      return {
        books: [],
        totalBooks: 0,
        currentPage: 0,
        showPagination: false,
        // modal: {
        //   text: '',
        //   show: false,
        //   book: null,
        // },
      };
    },
  // data(): {
  //   users: IUserConciseInfo[],
  //   totalUsers: number,
  //   isLoading: boolean,
  // } {
  //   return {
  //     users: [],
  //     totalUsers: 0,
  //     isLoading: false,
  //   };
  // },
  mounted() {
    this.getBooks(1);
  },
  methods: {
    handlePageChange(page: number) {
      // console.log('#change', this.currentPage);
      if (page !== this.currentPage) {
        this.getBooks(page);
      }
    },
    getBooks(page: number) {
      apiService.getUserBooks(1, +this.$route.params.id).then((res: any) => {
        console.log('#user books', res);
        this.books = res.data.results;
        this.totalBooks = res.data.count;
        if (res.data.next || res.data.previous) {
          this.showPagination = true;
        }
      }, (err: any) => {
        console.log('#success', err);
      });
    },
  },
});
</script>

<style scoped lang="scss">
</style>