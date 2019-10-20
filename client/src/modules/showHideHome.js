const state = {
  home: true,
  form: false,
  hours: false,
  recap: false
};

const getters = {
    showHome : (state) => state.home,
    showForm : (state) => state.form,
    showHours : (state) => state.hours,
    showRecap : (state) => state.recap
};

const mutations = {
    toHomeView: state => {
        state.home = true;
        state.form = false;
        state.calendar = false;
        state.hours = false;
        state.recap = false;
    },

  toFormulaire: state => {
    state.home = false;
    state.form = true;
    state.calendar = false;
    state.hours = false;
    state.recap = false;
  },

  toHours : state => {
    state.home = false;
    state.form = false;
    state.calendar = false;
    state.hours = true;
    state.recap = false;
  },

  toRecap : state => {
    state.home = false;
    state.form = false;
    state.calendar = false;
    state.hours = false;
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
