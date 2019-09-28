import Vue from "vue";
import vuex from "vuex";
import axios from 'axios';

Vue.use(vuex);

export default new vuex.Store({
  state: {
    nom: null,
    prenom: null,
    telephone: null,
    sexe: null,
    jour: null,
    heure: null
    // homeView : true ,
    //  formulaire: false,
    // calendrier: false,
    // lesHeures : false,
    // recap : false
  },

  //  getters : {
  //      baseColor : (state) => state.defaultColor
  //  },

  mutations: {
    //  changeView1: state => {
    //    state.homeView = false;
    //    state.formulaire = true;
    //  }

    getName: (state, nom) => (state.nom = nom),

    getFirstname: (state, prenom) => (state.prenom = prenom),

    getNumber: (state, telephone) => (state.telephone = telephone),

    getGenre: (state, sexe) => (state.sexe = sexe),

    getJour: (state, jour) => {
      state.jour = jour;

      //state.lesHeures = true;
    },

    getTime: (state, hour) => {
      state.hour = hour;

      state.recap = true;
    }
  },

  actions: {
    // retrieve hours

    loadhours(hours) {
      return axios.post("/upload", hours );
    }
  }
});
