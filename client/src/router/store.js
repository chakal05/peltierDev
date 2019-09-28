import Vue from "vue";
import vuex from "vuex";

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

    getInfo: (state, nom, prenom, telephone, sexe) => {
      state.nom = nom;
      state.prenom = prenom;
      state.telephone = telephone;
      state.sexe = sexe;

      state.calendrier = true;
      alert("got em from the store");
    },

    getJour: (state, jour) => {
      state.jour = jour;

      state.lesHeures = true;
    },

    getTime: (state, hour) => {
      state.hour = hour;

      state.recap = true;
    }
  },

  actions: {
    // retrieve hours
  }
});
