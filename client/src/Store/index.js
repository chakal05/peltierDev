import Vuex from "vuex";
import Vue from "vue";
import global from '../modules/global'; 
// Load Vuex
Vue.use(Vuex);

// Create Store

export default new Vuex.Store({
  modules: {
    global
  }
});
