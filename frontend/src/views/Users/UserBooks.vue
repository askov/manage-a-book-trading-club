<template>
  <div class="mt-5"
       v-if="totalItems">
    <div>
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
    </div>
  </div>
</template>


<script lang="ts">
  import Vue from 'vue';
  // Components
  import ConciseBookCard from '@/components/ConciseBookCard/ConciseBookCard.vue';
  // Services
  import apiService from '@/services/api.service';
  // Mixins
  import PaginationMixin from '@/mixins/pagination.mixin';

  export default PaginationMixin.extend({
    name: 'userBooks',
    components: {
      ConciseBookCard,
    },
    data(): {
      items: IBookResponse[];
    } {
      return {
        items: [],
      };
    },
    mounted() {
      console.log('router', this.$route);
    },

    methods: {
      getItems(page: number) {
        apiService.getUserBooks(page, +this.$route.params.userId)
          .then(this.handleItemsGetSuccess, this.handleItemsGetError);
      },
    },
  });

</script>

<style scoped
       lang="scss">
</style>
