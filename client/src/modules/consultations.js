import axios from "axios";
import { _ } from "vue-underscore";

const state = {
  id: null,
  nom: null,
  prenom: null,
  telephone: null,
  sexe: null,
  jour: null,
  heure: null,
  email: null,
  docteur: null,
  dispoHours: [],
  success: false,
  error: false
};

const getters = {
  getId: state => state.id,
  getName: state => state.nom,
  getFirstname: state => state.prenom,
  getPhone: state => state.telephone,
  getGenre: state => state.sexe,
  getJour: state => state.jour,
  getHeure: state => state.heure,
  getHours: state => state.dispoHours,
  getDocteur: state => state.docteur,
  getMail: state => state.email,
  ifSuccess: state => state.success,
  ifError: state => state.error
};

const mutations = {
  setName: (state, nom) => (state.nom = nom),

  setFirstname: (state, prenom) => (state.prenom = prenom),

  setNumber: (state, telephone) => (state.telephone = telephone),

  setGenre: (state, sexe) => (state.sexe = sexe),

  setJour: (state, jour) => (state.jour = jour),

  setTime: (state, hour) => (state.heure = hour),

  setHours: (state, available) => (state.dispoHours = available),

  setId: (state, inputId) => (state.id = inputId),
  
  setEmail: (state, inputEmail) => (state.email = inputEmail),

  setdocteur: (state, docteur) => (state.docteur = docteur),

  setRank: () => {
    let rank;

    if (state.heure) {
      if (state.heure === "8:30") {
        rank = 1;
      } else if (state.heure === "9:00") {
        rank = 2;
      } else if (state.heure === "9:30") {
        rank = 3;
      } else if (state.heure === "10:00") {
        rank = 4;
      } else if (state.heure === "10:30") {
        rank = 5;
      } else if (state.heure === "11:00") {
        rank = 6;
      } else if (state.heure === "11:30") {
        rank = 7;
      } else if (state.heure === "12:00") {
        rank = 8;
      } else if (state.heure === "16:00") {
        rank = 9;
      } else if (state.heure === "16:30") {
        rank = 10;
      } else if (state.heure === "17:00") {
        rank = 11;
      } else if (state.heure === "17:30") {
        rank = 12;
      } else if (state.heure === "18:00") {
        rank = 13;
      }
      // return rank;
    }

    return rank;
  },

  async register() {
    let sendData = await axios
      .post("/register", {
        prenom: state.prenom,
        nom: state.nom,
        telephone: state.telephone,
        genre: state.sexe,
        date: state.jour,
        time: state.heure,
        docteur: state.docteur,
        rank: mutations.setRank()
      })
      .catch(() => {
        state.error = true;
      });

    if (sendData && sendData.status === 200) {
      state.success = true;
    }
  },

  async changeItem() {
    let sendData = await axios
      .put("/reservations", {
        id: state.id,
        nom: state.nom,
        telephone: state.telephone,
        genre: state.sexe,
        time: state.heure,
        docteur: state.docteur,
        rank: mutations.setRank()
      })
      .catch(() => {
        state.error = true;
      });

    if (sendData && sendData.status === 200) {
      state.success = true;
    }
  },

  async SupprItem() {
    let sendData = await axios
      .post("/reservations", {
        item: state.id
      })
      .catch(() => {
        state.error = true;
      });

    if (sendData && sendData.status === 200) {
      state.success = true;
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
      "8:30",
      "9:00",
      "9:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00"
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
        // let sorted = mutations.sortProperties(displayHours, "heure", false, false);
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
