import axios from "axios";

const state = {
  docId:null,
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
  getDoctorsList: state => state.doctorsList,
  getDoctorId: state => state.docId
};

const mutations = {
  setDoctors: (state, doctors) => (state.doctorsList = doctors),
  setDoctorName: (state, name) => (state.docName = name),
  setDepartement:(state, departement) => (state.departement = departement),
  setDoctorTelephone:(state, tel) => (state.docTelephone = tel),
  setDoctorUsername:(state, username)=> (state.docUsername = username),
  setDoctorPassword:(state, pass)=> (state.docPassword = pass),
  setDoctorId: (state, id) => (state.docId = id)
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
      .post("/doctors", {
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
      if(state.success){
        alert(sendData.data);
      }
    }
  },

  async editDoctor() {
    let sendData = await axios
    .put("/doctors", {
      id: state.docId,
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
  },

  async deleteDoctor() {
    let sendData = await axios
    .delete("/doctors", {
        data:  state.docId
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
