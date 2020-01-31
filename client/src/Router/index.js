import Vue from "vue";
import Router from "vue-router";
import homeView from "../views/home.vue";
import adminView from "../views/admin.vue";
import adminDash from "../components/admin/adminDash.vue";
import doctorView from "../views/doctor.vue";
import adminDoc from "../components/admin/doctors.vue";
import nurseView from "../views/nurse.vue";
import adminNurse from "../components/admin/nurses.vue";
import patientView from "../views/patient.vue";
import messages from "../components/messages.vue";
import bookings from "../components/bookings.vue";
import patientList from "../components/admin/patient.vue";
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
        {
          path: "adminDash",
          name: "adminDash",
          component: adminDash
        },
        {
          path: "adminDoc",
          name: "adminDoc",
          component: adminDoc
        },
        {
          path: "adminNurse",
          name: "adminNurse",
          component: adminNurse
        },
        {
          path: "messages",
          name: "messages",
          component: messages
        },
       
        {
          path: "bookings",
          name: "bookings",
          component: bookings
        },
    
        {
          path: "patientList",
          name: "patientList",
          component: patientList
        }
      ]
    },
   
    {
      path: "/doctor",
      name: "doctor",
      component: doctorView,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: "/nurse",
      name: "nurse",
      component: nurseView,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: "/patient",
      name: "patient",
      component: patientView,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

// ? If token doest exist, redirect to homepage
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem("accesToken")) {
      next("/");
    } else {
      if (from.path !== to.path) {
        next();
      }
    }
  } else {
    next();
  }
});
export default router;
