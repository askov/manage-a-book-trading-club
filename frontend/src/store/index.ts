import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { getStoreBuilder } from 'vuex-typex';
import './modules/user';

export interface RootState { user: UserState; }

const debug = process.env.NODE_ENV !== 'production';

Vue.filter('ellipsis', function (value: string, cutLength: number): string {
  if (!value) { return ''; }
  const val = value.toString();
  return val.slice(0, cutLength) + (val.length > cutLength ? '…' : '');
});

Vue.use(Vuex);
const store: Store<RootState> = getStoreBuilder<RootState>().vuexStore({
  strict: debug,
});
export default store;
