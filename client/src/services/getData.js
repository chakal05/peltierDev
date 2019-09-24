import axios from "axios";

export default {
  loadLogo(logo) {
    return axios.post("/upload", logo);
  },

  getLogo(logoName) {
    return axios.get("/upload", {
      params: {
        filename: logoName
      }
    });
  }
};
