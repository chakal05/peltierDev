import axios from "axios";

const state = {
  patientId: null,
  patientName: null,
  patientTelephone: null,
  patientEmail: null,
  patientAdresse: null,
  patientCity: null,
  patientSexe : null,
  patientBirthdate: null,
  patientUsername: null,
  patientPassword: null,
  patientList: [],
  profil: null,
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
  getPatientEmail : state => state.patientEmail,
  getPatientAdresse: state => state.patientAdresse,
  
};

const mutations = {
  setPatients: (state, patients) => (state.patientList= patients),
  setPatientName: (state, name) => (state.patientName = name),
  setPatientTelephone: (state, tel) => (state.patientTelephone = tel),
  setPatientUsername: (state, username) => (state.patientUsername = username),
  setPatientPassword: (state, pass) => (state.patientPassword = pass),
  setPatientId: (state, id) => (state.patientId = id),
  setPatientAdresse: (state, adresse) => (state.patientAdresse = adresse),
  setPatientEmail : (state, email) => (state.patientEmail = email),
  setPatientCity: (state, city) => (state.patientCity = city),
  setPatientSexe : (state, genre) => (state.patientSexe = genre),
  setPatientBirth : (state, birth) => (state.patientBirthdate = birth),
  setPatientProfil: (state, profil) => (state.profil = profil)
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
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
