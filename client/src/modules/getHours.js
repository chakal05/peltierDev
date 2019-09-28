import axios from "axios";

const state = {
  //nom: null,
  //prenom: null,
  //telephone: null,
  //sexe: null,
  //jour: '8:00',
  //heure: null
  // homeView : true ,
  //  formulaire: false,
  // calendrier: false,
  // lesHeures : false,
  // recap : false

  dispoHours: []
};

const getters = {
  getHours: state => state.dispoHours
};

const mutations = {
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
  },

  setHours : (state, dispoHours) => (state.dispoHours = dispoHours)
};

const actions = {
  // retrieve hours
  
  async loadHours ( { commit } ) {
    const response = await axios.get("/loadHours");
  commit('setHours', response.data);

  }

};

export default {
  state,
  getters,
  mutations,
  actions
};
