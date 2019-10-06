import axios from "axios";
import { _ } from "vue-underscore";

const state = {
  nom: null,
  prenom: null,
  telephone: null,
  sexe: null,
  jour: null,
  heure: null,
  dispoHours: [],
  success: false
};

const getters = {
  getName: state => state.nom,
  getFirstname: state => state.prenom,
  getPhone: state => state.telephone,
  getGenre: state => state.sexe,
  getJour: state => state.jour,
  getHeure: state => state.heure,
  getHours: state => state.dispoHours,
  ifSuccess: state => state.success
};

const mutations = {
  setName: (state, nom) => (state.nom = nom),

  setFirstname: (state, prenom) => (state.prenom = prenom),

  setNumber: (state, telephone) => (state.telephone = telephone),

  setGenre: (state, sexe) => (state.sexe = sexe),

  setJour: (state, jour) => (state.jour = jour),

  setTime: (state, hour) => (state.heure = hour),

  setHours: (state, available) => {
    state.dispoHours = available;
  },

  async register() {
    const sendData = await axios
      .post("/register", {
        prenom: state.prenom,
        nom: state.nom,
        telephone: state.telephone,
        genre: state.sexe,
        date: state.jour,
        time: state.heure
      })
      .catch(e => {
        alert(e);
      });

    if (sendData && sendData.status === 200) {
      state.success = true;

      setTimeout(() => {
        location.reload();
      }, 5000);
    }
  }
};

const actions = {
  // retrieve hours

  async loadHours({ commit }) {
    const response = await axios.post("/loadHours", {
      date: state.jour
    });

    // Default hours

    const baseHours = [
      "8 h 30",
      "9 h 00",
      "9 h 30",
      "10 h 00",
      "10 h 30",
      "11 h 00",
      "11 h 30",
      "12 h 00",
      "16 h 30",
      "17 h 00",
      "17 h 30",
      "18 h 00"
    ];

    if (!response.data[0]) {
      // No reservations for that day, send default hours

      commit("setHours", baseHours);
    } else {
      // if there are reservations for that day, display available hours

      let displayHours = _.difference(baseHours, response.data);

      if (!displayHours[0]) {
        //if fully booked

        let full = ["Fully booked"];

        commit("setHours", full);
      } else {
        commit("setHours", displayHours);
      }
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
