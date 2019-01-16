import Vue from 'vue';

const PAGE_SIZE = 10;

export default Vue.extend({
  data(): {
    items: ITradeRequest[],
    totalItems: number,
    page: number,
    showPagination: boolean,
    loading: boolean,
  } {
    return {
      items: [],
      totalItems: 0,
      page: 1,
      showPagination: false,
      loading: false,
    };
  },
  computed: {
    PAGE_SIZE: () => PAGE_SIZE,
    noItems(): boolean {
      return this.items.length === 0;
    },
  },
  mounted() {
    this.handleGetItems(this.page);
    console.log('#mixin mounted hook');
  },
  methods: {
    getItems(page: number) {
      // This one shuold be replaced in component
      console.log('#pagination mixin: getItems (stub)');
    },
    handlePageChange(page: number) {
      if (page !== this.page) {
        this.handleGetItems(page);
      }
    },
    updatePaginationVisibility(res: any) {
      this.showPagination = (res.data.next || res.data.previous);
    },
    handleGetItems(page: number) {
      this.loading = true;
      this.getItems(page);
    },
    handleItemsGetSuccess(res: any) {
      console.log('#res', res);
      this.loading = false;
      this.items = res.data.results;
      this.totalItems = res.data.count;
      this.updatePaginationVisibility(res);
    },
    handleItemsGetError(err: any) {
      console.log('#err', err);
      this.loading = false;
    },
  },
});
