<template>
  <div>
    <div class="alert alert-light"
         v-if="noItems"
         role="alert">
      You have no outcoming trade requests yet
    </div>
    <b-pagination size="md"
                  v-show="showPagination"
                  :total-rows="totalItems"
                  align="center"
                  v-model="page"
                  :per-page="PAGE_SIZE"
                  @change="handlePageChange"></b-pagination>
    <TradeRequestCard v-for="(el, index) of items"
                      :key="index"
                      :tradeRequest="el"
                      :mode="'outcoming'" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  // Services
  import apiService from '@/services/api.service';
  // Mixins
  import PaginationMixin from '@/mixins/pagination.mixin';
  // Components
  import TradeRequestCard from '@/components/TradeRequestCard/TradeRequestCard.vue';

  export default PaginationMixin.extend({
    name: 'OutcomingTradeRequests',
    components: {
      TradeRequestCard,
    },
    methods: {
      getItems(page: number) {
        apiService.getOutcomingTradeRequests(this.page).then(this.handleItemsGetSuccess, this.handleItemsGetError);
      },
    },
  });

</script>

<style scoped
       lang="scss">


</style>
