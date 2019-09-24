import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

// State's property should be retrievied from db and mutations should become actions
// When changed by school admin, update data accordingly


export default new vuex.Store({
    state : {
        defaultColor : '#283593',
        defaultLogo : 'logEx.png'
    },

  //  getters : {
  //      baseColor : (state) => state.defaultColor
  //  },

    mutations: {
        setColor : (state, customColor) => (state.defaultColor = customColor),
        setLogo : (state, customLogo) => (state.defaultLogo = customLogo)
    },

    actions : {
       
    }
})