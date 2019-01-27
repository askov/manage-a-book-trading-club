<template>
  <div class="container mt-5">
    <h6 class="text-secondary text-center mt-2">
      <b-badge variant="primary">books in collection: {{totalItems}}</b-badge>
    </h6>
    <div class="bg-light rounded mt-3">
      <b-pagination size="md"
                    v-show="showPagination"
                    :total-rows="totalItems"
                    align="center"
                    v-model="page"
                    :per-page="10"
                    @change="handlePageChange"></b-pagination>
      <div class="book-container">
        <ConciseBookCard v-for="(book, index) of items"
                         :book="book"
                         :key="index"></ConciseBookCard>
      </div>
      <h6 v-show="totalItems === 0">You have no books in your collection yet. You can always add new books to exchange using the <router-link to='book-store'>book store service</router-link> to add new books.</h6>
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
  import ConciseBookCard from '@/components/ConciseBookCard/index.vue';
  // Mixins
  import PaginationMixin from '@/mixins/pagination.mixin';


  export default PaginationMixin.extend({
    name: 'MyBooks',
    components: {
      ConciseBookCard,
    },
    data(): {
      items: IBookResponse[];
      modal: {
        text: string;
        show: boolean;
        book: IBookResponse | null;
      };
    } {
      return {
        items: [],
        modal: {
          text: '',
          show: false,
          book: null,
        },
      };
    },
    mounted() {
      evb.bus.$on(evb.event.REMOVE_BOOK, (book: IBookResponse) => {
        this.modal.show = true;
        this.modal.text = book.title;
        this.modal.book = book;
      });
    },
    methods: {
      getItems(page: number) {
        apiService.getUserBooks(page).then(this.handleItemsGetSuccess, this.handleItemsGetError);
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
        const ri = this.items.findIndex((el) => el.id === bookId);
        this.items.splice(ri, 1);
        this.totalItems -= 1;
      },
    },
  });

</script>

<style scoped
       lang="scss">


</style>
