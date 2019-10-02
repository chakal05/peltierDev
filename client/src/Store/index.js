import Vuex from "vuex";
import Vue from "vue";
import nextPrev from "../modules/nextPrev";
import submitForm from "../modules/submitForm";
// Load Vuex
Vue.use(Vuex);

// Create Store

export default new Vuex.Store({
  modules: {
    nextPrev,
    submitForm
  }
});
