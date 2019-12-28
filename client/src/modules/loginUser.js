//import axios from 'axios';

const state = {
  name: null,
  email: null,
  adresse: null,
  city: null,
  birthdate: null,
  username: null,
  password: null,
  userFound: false
};

const getters = {
  ifUserFound: state => state.userFound,
  getName: state => state.name,
  getTelephone: state => state.telephone,
  getEmail: state => state.email,
  getAdresse: state => state.adresse,
  getCity: state => state.city,
  getBirthdate: state => state.birthdate,
  getUsername: state => state.username,
  getPassword: state => state.password
};

const mutations = {
  setIfUserFound: (state, found) => (state.userFound = found),
  setName: (state, name) => (state.name = name),
  setTelephone: (state, telephone) => (state.telephone = telephone),
  setAdresse: (state, adresse) => (state.adresse = adresse),
  setEmail: (state, email) => (state.email = email),
  setBirthdate: (state, birthdate) => (state.birthdate = birthdate),
  setUsername: (state, username) => (state.username = username),
  setPassword: (state, password) => (state.password = password),
  setCity: (state, city) => (state.city = city)
};

const actions = {
  //
};

export default {
  state,
  getters,
  mutations,
  actions
};
