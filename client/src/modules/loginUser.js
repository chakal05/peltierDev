import axios from "axios";
import router from "../Router/index";

const state = {};

const getters = {};

const mutations = {
  setHeaders: () => {
    if (localStorage.getItem("accesToken")) {
      axios.defaults.headers.common["authorization"] = localStorage.getItem(
        "accesToken"
      );
    }
  },

  parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function(c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  },

  logOut() {
    localStorage.clear();
    axios.defaults.headers.common["authorization"] = null;
    // router.push('/') gives me a pending request the second time
    // a user tries to log in
    location.reload("/");
  }
};

const actions = {
  // retrieve token

  async logUser({ commit }, { email, password, profil }) {
    const url = "/login";
    const payload = {
      email: email,
      password: password,
      profil: profil
    };

    await axios(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      data: payload
    })
      .then(response => {
        if (response.status === 200) {
          const token = response.data.accesToken;
          const decoded = mutations.parseJwt(token);
 
          localStorage.setItem("accesToken", token);
          localStorage.setItem("tokenUserName", decoded.name);
          localStorage.setItem("tokenUserId", decoded._id);
          localStorage.setItem("tokenUserProfil", decoded.profil);

          if (decoded.profil === "admin") {
            if (router.path !== "/admin/adminDash") {
              router.push("/admin/adminDash");
            }
          } else if (decoded.profil === "doctor") {
            if (router.path !== "/admin/adminDash") {
              router.push("/admin/adminDash");
            }
          } else if (decoded.profil === "nurse") {
            if (router.path !== "/admin/adminDash") {
              router.push("/admin/adminDash");
            }
          }
        }
      })
      .catch(err => {
        if (err) {
          alert("something wrong with the credentials");
        }
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
