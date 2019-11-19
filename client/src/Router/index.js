import Vue from "vue";
import Router from "vue-router";
import homeView from "../views/home.vue";
import adminView from "../views/admin.vue";
import doctorView from "../views/doctor.vue";
import nurseView from "../views/nurse.vue";
import patientView from "../views/patient.vue";
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: homeView
    },

    {
      path: "/admin",
      name: "admin",
      component: adminView
    },

    {
      path: "/doctor",
      name: "doctor",
      component: doctorView
    },

    {
      path: "/nurse",
      name: "nurse",
      component: nurseView
    },

    {
      path: "/patient",
      name: "patient",
      component: patientView
    }

  ]
});

export default router;
