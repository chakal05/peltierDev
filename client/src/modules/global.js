import axios from "axios";
import router from "../Router/index";
const state = {
  unreadMessages: null
};

const getters = {};
const mutations = {
  logOut() {
    localStorage.clear();
    axios.defaults.headers.common["authorization"] = null;
    // router.push('/') gives me a pending request the second time
    // a user tries to log in
    // location.reload("/");
    router.replace("/");
  }
};
const actions = {
  async loadMessages() {
    await axios
      .get("/messages", {
        params: {
          id: localStorage.getItem("tokenUserId"),
          data: "messages"
        }
      })
      .then(response => {
        this.listOfMessages = response.data;
      })
      .catch(err => {
        throw err;
      });
  },

  
};

export default {
  state,
  getters,
  mutations,
  actions
};
