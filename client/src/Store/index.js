import Vuex from "vuex";
import Vue from "vue";
import nextPrev from "../modules/showHideHome";
import showComp from "../modules/showHideAdmin";
import consultations from "../modules/consultations";
import bookings from "../modules/getReservations";
// Load Vuex
Vue.use(Vuex);

// Create Store

export default new Vuex.Store({
  modules: {
    nextPrev,
    showComp,
    consultations,
    bookings
  }
});
