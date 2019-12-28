import axios from "axios";
import { _ } from 'vue-underscore';

const state = {
  patientId: null,
  patientName: null,
  patientTelephone: null,
  patientEmail: null,
  patientAdresse: null,
  patientCity: null,
  patientSexe: null,
  patientBirthdate: null,
  patientUsername: null,
  patientPassword: null,
  patientDoctor: null,
  dispoHours: [],
  patientList: [],
  profil: null,
  rank: null,
  error: false,
  success: false
};

// Todo delete later when unnecessary

const getters = {
  getPatientName: state => state.patientName,
  getPatientTelephone: state => state.patientTelephone,
  getPatientUsername: state => state.patientUsername,
  getPatientPassword: state => state.patientPassword,
  getPatientsList: state => state.patientList,
  getPatientId: state => state.patientId,
  getPatientEmail: state => state.patientEmail,
  getPatientAdresse: state => state.patientAdresse,
  getPatientDoctor: state => state.patientDoctor
};

const mutations = {
  setPatients: (state, patients) => (state.patientList = patients),
  setPatientName: (state, name) => (state.patientName = name),
  setPatientTelephone: (state, tel) => (state.patientTelephone = tel),
  setPatientUsername: (state, username) => (state.patientUsername = username),
  setPatientPassword: (state, pass) => (state.patientPassword = pass),
  setPatientId: (state, id) => (state.patientId = id),
  setPatientAdresse: (state, adresse) => (state.patientAdresse = adresse),
  setPatientEmail: (state, email) => (state.patientEmail = email),
  setPatientCity: (state, city) => (state.patientCity = city),
  setPatientSexe: (state, genre) => (state.patientSexe = genre),
  setPatientBirth: (state, birth) => (state.patientBirthdate = birth),
  setPatientProfil: (state, profil) => (state.profil = profil),
  setPatientDoctor: (state, doc) => (state.patientDoctor = doc),
  setHours: (state, available) => (state.dispoHours = available),
  setAppointments: (state, bookings) => (state.appointments = bookings),
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
  // retrieve patients

  async loadPatients({ commit }, profil) {
    const response = await axios.get("/patient", { params: { profil } });

    if (response && response.data) {
      commit("setPatients", response.data);
    }
  },

  // Add new patient

  async addPatient() {
    let sendData = await axios
      .post("/patient", {
        name: state.patientName,
        telephone: state.patientTelephone,
        email: state.patientEmail,
        adresse: state.patientAdresse,
        city: state.patientCity,
        birthdate: state.patientBirthdate,
        username: state.patientUsername,
        password: state.patientPassword,
        doctor: state.patientDoctor,
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

  // Edit patient

  async editPatient() {
    let sendData = await axios
      .put("/patient", {
        id: state.patientId,
        name: state.patientName,
        telephone: state.patientTelephone,
        email: state.patientEmail,
        adresse: state.patientAdresse,
        city: state.patientCity,
        birthdate: state.patientBirthdate,
        username: state.patientUsername,
        password: state.patientPassword,
        doctor: state.patientDoctor,
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

  // Delete patient

  async deletePatient() {
    let sendData = await axios
      .delete("/patient", {
        data: state.patientId
      })
      .catch(() => {
        state.error = true;
      });

    if (sendData && sendData.status === 200) {
      state.success = true;
      alert(sendData.data);
    }
  },

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
