import Vue from "vue";
import Router from "vue-router";
import homeView from "../views/home.vue";
import adminView from "../views/admin.vue";
import doctorView from "../views/doctor.vue";
import nurseView from "../views/nurse.vue";
import patientView from "../views/patient.vue";
import Store from "../Store/index"
Vue.use(Router);

const router = new Router({
  // Older browser support for SPA
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: homeView
    },

    {
      path: "/admin",
      name: "admin",
      component: adminView,
      meta: { requiresAuth: true },
      children: [
        
      ]
    },

  //  {
  //    path: "/doctor",
  //    name: "doctor",
  //    component: doctorView,
  //    meta: {
  //      requiresAuth: true
  //    }
  //  },
//
  //  {
  //    path: "/nurse",
  //    name: "nurse",
  //    component: nurseView,
  //    meta: {
  //      requiresAuth: true
  //    }
  //  },
//
  //  {
  //    path: "/patient",
  //    name: "patient",
  //    component: patientView,
  //    meta: {
  //      requiresAuth: true
  //    }
  //  }
  ]
});

// ? If token doest exist, redirect to homepage
router.beforeEach((to, from, next) => {

 let isAuthorized = false;

  


  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (Store.state.userFound) {
     next();
    } else {
      router.replace("/");
    }
  } else {
    next();
  }
});
export default router;
