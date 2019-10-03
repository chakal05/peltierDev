const state = {
    dashboard : true,
    bookings : false
};

const getters = {
    getDashboard : (state) => state.dashboard,
    getBookings : (state) => state.bookings
};

const mutations = {
    showDashboard : (state) => {
        state.dashboard = true;
        state.bookings = false;
    },
    showBookings : (state) => {
        state.dashboard = false;
        state.bookings = true;
    }
};

export default {
  state,
  getters,
  mutations
};
