import axios from "axios";

const state = {
  docName: null,
  departement: null,
  docTelephone: null,
  docUsername: null,
  docPassword: null,
  doctorsList: [],
  error: false,
  success: false,
};

const getters = {
  getDoctorName: state => state.docName,
  getDepartement: state => state.departement,
  getDoctorTelephone: state => state.docTelephone,
  getDoctorUsername: state => state.docUsername,
  getDoctorPassword: state => state.docPassword,
  getDoctorsList: state => state.doctorsList
};

const mutations = {
  setDoctors: (state, doctors) => (state.doctorsList = doctors),
  setDoctorName: (state, name) => (state.docName = name),
  setDepartement:(state, departement) => (state.departement = departement),
  detDoctorTelephone:(state, tel) => (state.docTelephone = tel),
  setDoctorUsername:(state, username)=> (state.docUsername = username),
  setDoctorPassword:(state, pass)=> (state.docPassword = pass)
};

const actions = {
  // retrieve doctors
  async loadDoctors({ commit }) {
    const response = await axios.get("/doctors");

    if (response && response.data) {
      commit("setDoctors", response.data);
    }
  },

  // Add new doctor

  async addDoctor() {
    let sendData = await axios
      .post("/doctor", {
        name: state.docName,
        departement: state.departement,
        telephone: state.docTelephone,
        username: state.docUsername,
        password: state.docPassword
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
