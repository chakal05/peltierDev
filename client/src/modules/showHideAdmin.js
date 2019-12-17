const state = {
  dashboard: true,
  doctors: false,
  bookings: false,
  nurses: false,
  patients: false
};

const getters = {
  getDashboard: state => state.dashboard,
  getDoctors: state => state.doctors,
  getBookings: state => state.bookings,
  getNurses: state => state.nurses,
  getPatients: state => state.patients
};

const mutations = {
  showDashboard: state => {
    state.bookings = false;
    state.doctors = false;
    state.nurses = false;
    state.patients = false;
    state.dashboard = true;
  },
  showBookings: state => {
    state.dashboard = false;
    state.doctors = false;
    state.nurses = false;
    state.patients = false;
    state.bookings = true;
  },

  showDoctors: state => {
    state.dashboard = false;
    state.bookings = false;
    state.nurses = false;
    state.patients = false;
    state.doctors = true;
  },

  showNurses: state => {
    state.dashboard = false;
    state.bookings = false;
    state.doctors = false;
    state.patients = false;
    state.nurses = true;
  },

  showPatients: state => {
    state.dashboard = false;
    state.bookings = false;
    state.doctors = false;
    state.nurses = false;
    state.patients = true;
  }
};

export default {
  state,
  getters,
  mutations
};
