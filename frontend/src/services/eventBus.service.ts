import Vue from 'vue';
// const EventBus = new Vue();
// export default EventBus;

export default {
  bus: new Vue(),
  event: {
    ADD_NEW_BOOK: 'add-new-book',
    REMOVE_BOOK: 'remove-book',
    CHANGE_TRADE_REQUEST_STATUS: 'change-trade-request-status',
    ACCEPT_TRADE_REQUEST: 'accept-trade-request',
    DECLINE_TRADE_REQUEST: 'decline-trade-request',
  },
};
