import axios from 'axios';

const state = {
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
  };


 const  mutations = {
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
  };
 const actions = {
    // retrieve hours

  }


export default{

    state,
    mutations,
    actions

};