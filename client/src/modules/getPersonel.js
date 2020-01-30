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
  personelPassword: null,
  personelList: [],
  profil: null,
  error: false,
  success: false
};

// Todo delete later when unnecessary

const getters = {
  getPersonelList: state => state.personelList
};
const mutations = {
  setPersonel: (state, personel) => (state.personelList = personel),

  setPersonelInfo: (
    state,
    { adresse, city, birth, name, departement, tel, pass, email, id, profil }
  ) => {
    state.personelAdresse = adresse;
    state.personelCity = city;
    state.personelBirth = birth;
    state.personelName = name;
    state.personelEmail = email;
    state.departement = departement;
    state.personelTelephone = tel;
    state.personelId = id;
    state.personelPassword = pass;
    state.profil = profil;
  }
};

const actions = {
  // retrieve doctors

  async loadPersonel({ commit }, profil) {
    await axios
      .get("/personel", {
        params: {
          profil
        }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data) {
            commit("setPersonel", response.data);
          }
        }
      })
      .catch(err => {
        if (err === 403) {
          throw err;
        }
      });
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
        password: state.personelPassword
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
        data: { id: state.personelId }
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
