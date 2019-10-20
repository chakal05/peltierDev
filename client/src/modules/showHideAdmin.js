const state = {
  dashboard: true,
  doctors: false,
  bookings: false
};

const getters = {
  getDashboard: state => state.dashboard,
  getDoctors: state => state.doctors,
  getBookings: state => state.bookings
};

const mutations = {
  showDashboard: state => {
    state.dashboard = true;
    state.bookings = false;
    state.doctors = false;
  },
  showBookings: state => {
    state.dashboard = false;
    state.doctors = false;
    state.bookings = true;
  },

  showDoctors: state => {
    state.dashboard = false;
    state.bookings = false;
    state.doctors = true;
  }
};

export default {
  state,
  getters,
  mutations
};
