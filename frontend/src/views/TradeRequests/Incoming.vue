<template>
  <div>
    <!-- <h1 class="text-secondary">You have no incoming trade requests yet</h1> -->
    <!-- <div>You have no incoming trade requests yet</div> -->
    <div class="alert alert-light"
         v-if="noItems"
         role="alert">
      You have no incoming trade requests yet
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
                      :mode="'incoming'" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  // Components
  import TradeRequestCard from '@/components/TradeRequestCard/index.vue';
  // Services
  import apiService from '@/services/api.service';
  import evb from '@/services/eventBus.service';

  // Mixins
  import PaginationMixin from '@/mixins/pagination.mixin';

  export default PaginationMixin.extend({
    name: 'IncomingTradeRequests',
    components: {
      TradeRequestCard,
    },
    methods: {
      getItems(page: number) {
        apiService.getIncomingTradeRequests(this.page).then(this.handleItemsGetSuccess, this.handleItemsGetError);
      },
    },
    mounted() {
      console.log('#incoming HOOK');
      evb.bus.$on(evb.event.CHANGE_TRADE_REQUEST_STATUS, (status: string, tradeRequest: ITradeRequest) => {
        apiService.patchTradeRequestStatus(tradeRequest.target.id, tradeRequest.id, status).then((res) => {
          console.log('success', res);
          const tr = this.items.find((el) => el.id === tradeRequest.id);
          if (tr) {
            tr.status = status;
          }
        }, (err) => {
          console.log('err', err);
        });
      });
    },
  });

</script>

<style scoped
       lang="scss">


</style>
