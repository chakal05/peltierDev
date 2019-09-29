import axios from 'axios';

const state = {
   
  };


 const  mutations = {
   
  };
 const actions = {
    // retrieve hours

    loadhours(hours) {
      return axios.post("/upload", hours );
    }
  }


export default{

    state,
    mutations,
    actions

};