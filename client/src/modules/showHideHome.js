const state = {
  homeView: true,
  formulaire: false,
  calendrier: false,
  lesHeures: false,
  recap: false
};

const getters = {
    showFirst : (state) => state.homeView,
    showForm : (state) => state.formulaire,
    showCalendar : (state) => state.calendrier,
    showHours : (state) => state.lesHeures,
    showRecap : (state) => state.recap
};

const mutations = {
    toHomeView: state => {
        state.homeView = true;
        state.formulaire = false;
        state.calendrier = false;
        state.lesHeures = false;
        state.recap = false;
    },

  toFormulaire: state => {
    state.homeView = false;
    state.formulaire = true;
    state.calendrier = false;
    state.lesHeures = false;
    state.recap = false;
  },

  toCalendar : state => {
    state.homeView = false;
    state.formulaire = false;
    state.calendrier = true;
    state.lesHeures = false;
    state.recap = false;
  },

  toHours : state => {
    state.homeView = false;
    state.formulaire = false;
    state.calendrier = false;
    state.lesHeures = true;
    state.recap = false;
  },

  toRecap : state => {
    state.homeView = false;
    state.formulaire = false;
    state.calendrier = false;
    state.lesHeures = false;
    state.recap = true;
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
