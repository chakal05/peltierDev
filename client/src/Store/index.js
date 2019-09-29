import Vuex from "vuex";
import Vue from "vue";
import loadHours from "../modules/getHours";
import nextPrev from "../modules/nextPrev";

// Load Vuex
Vue.use(Vuex);

// Create Store

export default new Vuex.Store({
  modules: {
    nextPrev,
    loadHours,
  
  }
});
