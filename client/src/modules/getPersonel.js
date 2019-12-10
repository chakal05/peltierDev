import axios from "axios";

const state = {
  personelId: null,
  personelName: null,
  departement: null,
  personelTelephone: null,
  personelUsername: null,
  personelPassword: null,
  personelList: [],
  error: false,
  success: false
};

// Todo delete later when unnecessary

const getters = {
  getPersonelName: state => state.personelName,
  getDepartement: state => state.departement,
  getPersonelTelephone: state => state.personelTelephone,
  getPersonelUsername: state => state.personelUsername,
  getPersonelPassword: state => state.personelPassword,
  getPersonelList: state => state.personelList,
  getPersonelId: state => state.personelId
};

const mutations = {
  setPersonel: (state, personel) => (state.personelList = personel),
  setPersonelName: (state, name) => (state.personelName = name),
  setDepartement: (state, departement) => (state.departement = departement),
  setPersonelTelephone: (state, tel) => (state.personelTelephone = tel),
  setPersonelUsername: (state, username) => (state.personelUsername = username),
  setPersonelPassword: (state, pass) => (state.personelPassword = pass),
  setPersonelId: (state, id) => (state.personelId = id)
};

const actions = {
  // retrieve doctors

  async loadPersonel({ commit }, profil) {
    const response = await axios.get("/personel", { params: { profil } });

    if (response && response.data) {
      commit("setPersonel", response.data);
    }
  },

  // Add new doctor

  async addDoctor() {
    let sendData = await axios
      .post("/personel", {
        name: state.personelName,
        departement: state.departement,
        telephone: state.personelTelephone,
        username: state.personelUsername,
        password: state.personelPassword
      })
      .catch(() => {
        state.error = true;
      });

    if (sendData && sendData.status === 200) {
      state.success = true;
    }
  },

  async editDoctor() {
    let sendData = await axios
      .put("/doctors", {
        id: state.personelId,
        name: state.personelName,
        departement: state.departement,
        telephone: state.personelTelephone,
        username: state.personelUsername,
        password: state.personelPassword
      })
      .catch(() => {
        state.error = true;
      });

    if (sendData && sendData.status === 200) {
      state.success = true;
    }
  },

  async deleteDoctor() {
    let sendData = await axios
      .delete("/doctors", {
        data: state.personelId
      })
      .catch(() => {
        state.error = true;
      });

    if (sendData && sendData.status === 200) {
      state.success = true;
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
