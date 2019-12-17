import axios from "axios";

const state = {
  personelId: null,
  personelName: null,
  departement: null,
  personelEmail: null,
  personelAdresse: null,
  personelCity: null,
  personelBirth: null,
  personelTelephone: null,
  personelUsername: null,
  personelPassword: null,
  personelList: [],
  profil: null,
  error: false,
  success: false
};

// Todo delete later when unnecessary

const getters = {
 // getPersonelName: state => state.personelName,
 // getDepartement: state => state.departement,
 // getPersonelTelephone: state => state.personelTelephone,
 // getPersonelUsername: state => state.personelUsername,
 // getPersonelPassword: state => state.personelPassword,
  getPersonelList: state => state.personelList,
 // getPersonelId: state => state.personelId,
 // getPersonelProfil: state => state.profil
};

const mutations = {
  setPersonelEmail: (state, email) => (state.personelEmail = email),
  setPersonelAdresse: (state, adresse) => (state.personelAdresse = adresse),
  setPersonelCity: (state, city) => (state.personelCity = city),
  setPersonelBirth : (state, birth ) => {
    state.personelBirth = birth;
    alert(state.personelBirth);
  },
  setPersonel: (state, personel) => (state.personelList = personel),
  setPersonelName: (state, name) => (state.personelName = name),
  setDepartement: (state, departement) => (state.departement = departement),
  setPersonelTelephone: (state, tel) => (state.personelTelephone = tel),
  setPersonelUsername: (state, username) => (state.personelUsername = username),
  setPersonelPassword: (state, pass) => (state.personelPassword = pass),
  setPersonelId: (state, id) => (state.personelId = id),
  setPersonelProfil: (state, profil) => (state.profil = profil)
};

const actions = {
  // retrieve doctors

  async loadPersonel({ commit }, profil) {
    const response = await axios.get("/personel", { params: { profil } });

    if (response && response.data) {
      commit("setPersonel", response.data);
    }
  },

  // Add new personel

  async addPersonel() {
    let sendData = await axios
      .post("/personel", {
        name: state.personelName,
        departement: state.departement,
        telephone: state.personelTelephone,
        adresse: state.personelAdresse,
        city: state.personelCity,
        email: state.personelEmail,
        birthdate: state.personelBirth,
        username: state.personelUsername,
        password: state.personelPassword,
        profil: state.profil
      })
      .catch(() => {
        state.error = true;
      });

    if (sendData && sendData.status === 200) {
      state.success = true;
      alert(sendData.data);
    }
  },

  // Edit personel info

  async editPersonel() {
    let sendData = await axios
      .put("/personel", {
        id: state.personelId,
        name: state.personelName,
        departement: state.departement,
        telephone: state.personelTelephone,
        adresse: state.personelAdresse,
        city: state.personelCity,
        email: state.personelEmail,
        birthdate: state.personelBirth,
        username: state.personelUsername,
        password: state.personelPassword,
      })
      .catch(() => {
        state.error = true;
      });

    if (sendData && sendData.status === 200) {
      state.success = true;
      alert(sendData.data);
    }
  },

  async deletePersonel() {
    let sendData = await axios
      .delete("/personel", {
        data: state.personelId
      })
      .catch(() => {
        state.error = true;
      });

    if (sendData && sendData.status === 200) {
      state.success = true;
      alert(sendData.data);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
