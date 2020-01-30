import Vuex from "vuex";
import Vue from "vue";
import nextPrev from "../modules/showHideHome";
import showComp from "../modules/showHideAdmin";
import personel from "../modules/getPersonel";
import global from '../modules/global'; 
import appointment from '../modules/appointment';
// Load Vuex
Vue.use(Vuex);

// Create Store

export default new Vuex.Store({
  modules: {
    nextPrev,
    showComp,
    personel,
    appointment,
    global
  }
});
