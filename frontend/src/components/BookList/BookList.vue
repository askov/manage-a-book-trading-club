<template>
  <div>
    <h6 class="text-secondary text-center mt-2" v-show="totalItems > 0">
      <b-badge variant="success">books discovered: {{totalItems}}</b-badge>
    </h6>
    <div class="vld-parent bg-light rounded mt-3" v-show="totalItems > 0 || isLoading">
      <loading
        :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="false"
        :color="'#007bff'"
      ></loading>
      <virtual-list :size="105" :remain="5" class="custom-scroll-1" :tobottom="toBottom">
        <BookCard v-for="(book, index) of books" :key="index" :book="book"/>
      </virtual-list>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BookCard from '@/components/BookCard/index.vue';
import Loading from 'vue-loading-overlay';

export default Vue.extend({
  name: 'BookList',
  props: {
    books: Array,
    isLoading: Boolean,
  },
  components: {
    BookCard,
    Loading,
  },
  computed: {
    totalItems(): number {
      return this.books.length || 0;
    },
  },
  methods: {
    toBottom() {
      this.$parent.$emit('list-end-reached');
    },
  },
});
</script>

<style scoped lang="scss">
</style>
