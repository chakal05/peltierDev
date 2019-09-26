import Vue from "vue";
import vuex from "vuex";

Vue.use(vuex);

// State's property should be retrievied from db and mutations should become actions
// When changed by school admin, update data accordingly

export default new vuex.Store({
  state: {
   // firstView   
  //  formulaire: false
  },

  //  getters : {
  //      baseColor : (state) => state.defaultColor
  //  },

  mutations: {
  //  changeView1: state => {
  //    state.firstView = false;
  //    state.formulaire = true;
  //  }
  },

  actions: {}
});
