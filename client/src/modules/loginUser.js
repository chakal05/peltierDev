import axios from "axios";
const state = {
  token: localStorage.getItem("accesToken") || null,
  tokenName: null
};

const getters = {
  getTokenProfil: state => state.goToView,
  getTokenName: state => state.tokenName
};

const mutations = {
  setToken: (state, token) => (state.token = token),
  setTokenName: (state, name) => (state.tokenName = name)
};

const actions = {
  // retrieve token

};

export default {
  state,
  getters,
  mutations,
  actions
};
