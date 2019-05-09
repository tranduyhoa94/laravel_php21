import Vue from "vue";
import Vuex from "vuex";

import AccountStore from './modules/account.store'
Vue.use( Vuex );

export default new Vuex.Store( {
  modules: {
    // DashBoard,
    AccountStore,
    // CategoriesStore,
    // PostStore
  }
} );