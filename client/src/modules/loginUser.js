import axios from "axios";
import router from "../Router/index";
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
  setTokenName: (state, name) => (state.tokenName = name),
  setHeaders: () => {
    if (state.token) {
      axios.defaults.headers.common["Authorization"] = state.token;
    } else {
      axios.defaults.headers.common["Authorization"] = null;
    }
  },
  logOut() {
    state.token = null;
    router.replace("/");
  }
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
