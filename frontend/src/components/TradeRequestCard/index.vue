<template>
  <transition name="fade"
              mode="out-in">
    <div class="p-3 border mb-1 d-flex align-items-center">
      <a :href="tradeRequest.target.link"
         target="_blank">{{tradeRequest.target.title}}</a>
      <router-link class="ml-2"
                   :to="{name: 'user-details', params: {userId: userUrlConf.id}}">{{userUrlConf.username}}</router-link>

      <b-badge class="ml-2"
               :variant="badgeVariant">{{tradeRequest.status}}</b-badge>
      <div class="ml-2"
           v-b-popover.hover="tradeRequest.message"
           title="Message"><i class="fas fa-comment-alt text-primary"></i></div>
      <div v-if="showButtons"
           class="ml-auto">
        <b-button variant="success"
                  @click="handleAccept"
                  class="mr-2">Accept</b-button>
        <b-button variant="danger"
                  @click="handleDecline">Decline</b-button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
  import Vue from 'vue';
  // Services
  import evb from '@/services/eventBus.service';

  enum TradeRequstStatus {
    Pending = 'pending',
      Accepted = 'accepted',
      Declined = 'declined',
  }

  export default Vue.extend({
    name: 'TradeRequestCard',
    components: {},
    props: {
      tradeRequest: {
        type: Object as() => ITradeRequest,
      },
      mode: String,
    },
    computed: {
      showButtons(): boolean {
        return (this.mode === 'incoming' && (this.tradeRequest.status === TradeRequstStatus.Pending));
      },
      userUrlConf(): {
        username: string,
        id: number
      } {
        if (this.mode === 'incoming') {
          return this.tradeRequest.created_by;
        } else {
          return this.tradeRequest.target_owner;

        }
      },
      badgeVariant(): string {
        switch (this.tradeRequest.status) {
          case TradeRequstStatus.Accepted:
            return 'success';
          case TradeRequstStatus.Declined:
            return 'danger';
          default:
            return 'warning';
        }
      },
    },
    methods: {
      handleAccept() {
        console.log('accept');
        evb.bus.$emit(
          evb.event.CHANGE_TRADE_REQUEST_STATUS,
          TradeRequstStatus.Accepted,
          this.tradeRequest
        );
      },
      handleDecline() {
        console.log('decline');
        // evb.bus.$emit(evb.event.DECLINE_TRADE_REQUEST, this.tradeRequest);
        evb.bus.$emit(
          evb.event.CHANGE_TRADE_REQUEST_STATUS,
          TradeRequstStatus.Declined,
          this.tradeRequest
        );
      },
    },
  });

</script>

<style scoped
       lang="scss">
  //

</style>
