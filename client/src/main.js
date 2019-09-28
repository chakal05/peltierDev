 import Vue from "vue"
 import App from "./App.vue"
 import vuetify from "./plugins/vuetify"
 import Vuetify from 'vuetify/lib'
 import fr from 'vuetify/lib/locale/fr'
 import router from "./Router/index"
 import store from './Store'
 Vue.use(router);
 Vue.config.productionTip = false;
 Vue.use(Vuetify, {
 lang : {
   locale : { fr },
   current: 'fr'
 }
})
 new Vue({
   router,
   store,
   vuetify,
   render: h => h(App)
 }).$mount("#app");


 