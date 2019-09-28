import Vuex from "vuex";
import Vue from "vue";
import loadHours from "../modules/getHours";

// Load Vuex
Vue.use(Vuex);

// Create Store

export default new Vuex.Store({
  modules: {
    loadHours
  }
});
