import axios from "axios";

const state = {
 
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
  setHours: (state, dispoHours) => (
    state.dispoHours = dispoHours,
    state.recap = true
  )
};

const actions = {
  // retrieve hours

  async loadHours({ commit }) {
    const response = await axios.get("/loadHours");
    commit("setHours", response.data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
