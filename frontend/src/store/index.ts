import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { getStoreBuilder } from 'vuex-typex';
import './modules/user';

export interface RootState { user: UserState; }

const debug = process.env.NODE_ENV !== 'production';


Vue.use(Vuex);
const store: Store<RootState> = getStoreBuilder<RootState>().vuexStore({
  strict: debug,
});
export default store;
