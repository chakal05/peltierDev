import Vuex from "vuex";
import Vue from "vue";
import nextPrev from "../modules/showHideHome";
import showComp from "../modules/showHideAdmin";
import bookings from "../modules/appointment";
import personel from "../modules/getPersonel";
// Load Vuex
Vue.use(Vuex);

// Create Store

export default new Vuex.Store({
  modules: {
    nextPrev,
    showComp,
    bookings,
    personel
  }
});
