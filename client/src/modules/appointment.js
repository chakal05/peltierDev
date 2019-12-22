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
  docteur: null,
  dispoHours: [],
  appointments: [],
  success: false,
  error: false,
  rank: null,
  profil: "admin"
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
  getAppointments: state => state.appointments,
  getDocteur: state => state.docteur,
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

  setAppointments: (state, bookings) => (state.appointments = bookings),

  setId: (state, inputId) => (state.id = inputId),
  
  setdocteur: (state, docteur) => (state.docteur = docteur),
  
  setRank: () => {
     // Display appointments in ascending order
  
     const baseHours = [
       "08:30",
       "09:00",
       "09:30",
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
  
     if (state.heure) {
       state.rank = baseHours.indexOf(state.heure);
     }
   }
};

const actions = {
  // Retrieve bookings

  async loadBookings({ commit }, picker) {
    const response = await axios
      .get("/reservations", {
        params: { date: picker }
      })
      .catch(error => {
        if (error) {
          state.error = true;
          state.bookings = [];
          mutations.setJour(picker);
          this.loadHours(picker);
        }
      });

    if (response.data) {
      commit("setAppointments", response.data);
    }
  },

  // Retrieve booked hours

  async loadHours({ commit }, day) {
    const response = await axios.get("/reservations", {
      params: { date: [day, `hours`] }
    });

    // Default hours

    const baseHours = [
      "08:30",
      "09:00",
      "09:30",
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
        commit("setHours", displayHours);
      }
    }
  },

  // Add an appointment to dB
  async register() {
    let name;
    if (state.prenom) {
      name = state.prenom + " " + state.nom;
    } else {
      name = state.nom;
    }

    if (state.heure) {
      mutations.setRank();
    }

    let sendData = await axios
      .post("/reservations", {
        nom: name,
        telephone: state.telephone,
        genre: state.sexe,
        date: state.jour,
        time: state.heure,
        docteur: state.docteur,
        rank: state.rank
      })
      .catch(() => {
        state.error = true;
      });

    if (sendData && sendData.status === 200) {
      state.success = true;
      alert(sendData.data);
    }
  },

  // Edit appointment

  async changeItem() {
    let name;
    if (state.prenom) {
      name = state.prenom + " " + state.nom;
    } else {
      name = state.nom;
    }

    if (state.heure) {
      mutations.setRank();
    }

    let sendData = await axios
      .put("/reservations", {
        id: state.id,
        nom: name,
        téléphone: state.telephone,
        genre: state.sexe,
        heure: state.heure,
        docteur: state.docteur,
        rank: state.rank
      })
      .catch(() => {
        state.error = true;
      });

    if (sendData && sendData.status === 200) {
      state.success = true;
    }
  },

  // Delete an appointment from dB

  async SupprItem() {
    let sendData = await axios
      .delete("/reservations", {
        data: { id: state.id }
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
