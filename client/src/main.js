/*eslint-disable */
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App'
import router from './router'
import VeeValidate, {Validator} from 'vee-validate'
import fr from 'vee-validate/dist/locale/fr'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueAxios from 'vue-axios'
import axios from 'axios'
import underscore from 'vue-underscore'
Vue.use(router)
Vue.use(underscore)
Vue.use(VueAxios ,axios)
Vue.use(Vuetify, {
  iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
})
Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.use(VeeValidate)
Validator.localize('fr', fr)


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})