import Vue from 'vue';
// const EventBus = new Vue();
// export default EventBus;

export default {
  bus: new Vue(),
  event: {
    ADD_NEW_BOOK: 'add-new-book',
    REMOVE_BOOK: 'remove-book',
  },
};
