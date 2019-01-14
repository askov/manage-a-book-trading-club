<template>
  <div class="container mt-5">
    <h6 class="text-secondary text-center mt-2">
      <b-badge variant="primary">books in collection: {{totalBooks}}</b-badge>
    </h6>
    <div class="bg-light rounded p-4 mt-3">
      <b-pagination size="md"
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

    <b-modal v-model="modal.show"
             title="Remove book"
             hide-footer>
      <p class="my-4">
        Do you really want to remove this book
        <strong>&laquo;{{modal.text}}&raquo;</strong>?
      </p>
      <b-btn class="mt-3"
             variant="outline-danger"
             block
             @click="removeBook">Remove</b-btn>
    </b-modal>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  // Services
  import apiService from '@/services/api.service';
  import evb from '@/services/eventBus.service';
  // Components
  import ConciseBookCard from '@/components/ConciseBookCard/ConciseBookCard.vue';



  export default Vue.extend({
    name: 'MyBooks',
    components: {
      ConciseBookCard,
    },
    data(): {
      books: IBookResponse[];
      totalBooks: number;
      currentPage: number;
      modal: {
        text: string;
        show: boolean;
        book: IBookResponse | null;
      };
    } {
      return {
        books: [],
        totalBooks: 0,
        currentPage: 0,
        modal: {
          text: '',
          show: false,
          book: null,
        },
      };
    },
    mounted() {
      this.getMyBooks(1);
      evb.bus.$on(evb.event.REMOVE_BOOK, (book: IBookResponse) => {
        this.modal.show = true;
        this.modal.text = book.title;
        this.modal.book = book;
      });
    },
    methods: {
      getMyBooks(page: number) {
        apiService.getUserBooks(page).then(
          (res: any) => {
            console.log('#my books', res);
            this.books = res.data.results;
            this.totalBooks = res.data.count;

          },
          (err: any) => {
            console.warn('#error loading books');
          }
        );
      },
      removeBook() {
        if (this.modal.book && this.modal.book.id) {
          apiService.removeBook(this.modal.book.id).then((res) => {
            this.modal.show = false;
            this.removeBookFromList(this.modal.book!.id);
          }, (err) => {
            console.warn('#error removing book', err);
          });
        }
      },
      removeBookFromList(bookId: number) {
        const ri = this.books.findIndex((el) => el.id === bookId);
        this.books.splice(ri, 1);
        this.totalBooks -= 1;
      },
      handlePageChange(page: number) {
        if (page !== this.currentPage) {
          this.getMyBooks(page);
        }
      },
    },
  });

</script>

<style scoped
       lang="scss">


</style>
