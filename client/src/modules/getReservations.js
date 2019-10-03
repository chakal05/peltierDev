import axios from "axios";

const state = {
  date: null,
  table: false,
  calendar : true,
  bookedHours: []
};

const getters = {
  getBooked: (state) => state.bookedHours,
  getTable : (state) => state.table,
  getCalendar : (state) => state.calendar
};

const mutations = {
  fetchDate: (state, date) => {
    state.date = date;
    mutations.loadBookings();
  },

  async loadBookings() {
    let bookings = await axios
      .post("/reservations", { date: state.date })
      .catch(e => alert(e));

    if (bookings && bookings.status === 200) {
      state.bookedHours = bookings.data;
      state.table = true;
      state.calendar = false;
    }

  },

  retourner(){
    state.table = false;
      state.calendar = true;
  }
 
};

const actions = {
  // retrieve hours

  
};

export default {
  state,
  getters,
  mutations,
  actions
};
