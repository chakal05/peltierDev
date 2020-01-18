const state = {
    unreadMessages = null,
};

const getters = {
    getUnreadMessages
}
const mutations = {};
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
  }
};

export default {
  state,
  mutations,
  actions
};
