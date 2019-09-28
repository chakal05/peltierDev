import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home.vue'
import admin from '../views/admin.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Home
    },

  
    {
      path: '/dashboard',
      name: 'admin',
      component: admin
    }
  ]
})



export default router
