<template>
  <v-container>
    <v-app>
      <v-navigation-drawer
        color="teal darken-4"
        dark
        v-model="drawer"
        :clipped="$vuetify.breakpoint.lgAndUp"
        app
      >
        <div class="logo-gris">
          <v-app-bar-nav-icon class="bar" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title class="white--text">
            Manedek
            <v-icon>local_hospital</v-icon>
          </v-toolbar-title>
        </div>

        <v-list>
          <v-list-item @click="showDashboard">
            <v-list-item-icon>
              <v-icon>dashboard</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Tableau de bord</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="showDoctors">
            <v-list-item-icon>
              <v-icon>fas fa-user-md</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Doctors</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="showBookings">
            <v-list-item-icon>
              <v-icon>schedule</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Consultations</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn color="white" light block>Logout</v-btn>
          </div>
        </template>
      </v-navigation-drawer>

      <v-app-bar app clipped-left>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title class="mr-5 align-center">
          Manedek Medical Center
          <v-icon color="teal darken-4">local_hospital</v-icon>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-bell</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>account_circle</v-icon>
        </v-btn>
      </v-app-bar>

      <v-content>
        <v-container fill-height>
          <v-layout justify-center align-center>
            <v-flex>
              <dashboard v-if="getDashboard"></dashboard>
              <bookings v-if="getBookings"></bookings>
              <doctors v-if="getDoctors"></doctors>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </v-container>
</template>

<script>
import dashboard from "../components/admin/dashboard";
import bookings from "../components/admin/bookings";
import doctors from "../components/admin/doctors";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    dashboard,
    doctors,
    bookings
  },

  computed: {
    ...mapGetters(["getDashboard", "getBookings", "getDoctors"])
  },
  data: () => ({
    drawer: null
  }),

  methods: {
    ...mapMutations(["showDashboard", "showBookings", "showDoctors"])
  }
};
</script>

<style  lang='scss' scoped>
.container {
  .v-application--wrap {
    .v-navigation-drawer {
      .logo-gris {
        display: none;

        @media (max-width: 1264px) {
          display: block;
        }

        .bar {
          margin-left: 0.5rem;
          margin-top: 0.5rem;
        }

        .v-toolbar__title {
          position: relative;
          top: -2.2rem;
          left: 3.3rem;
          font-size: 1.5rem;

          .v-icon {
            font-size: 2rem;
            margin-left: 0.5rem;
            margin-top: 0rem;
          }
        }
      }
    }

    .v-app-bar {
      .v-toolbar__title {
        margin-left: -1rem;
        font-size: 1.5rem;
        margin-top: 0.3rem;

        .v-icon {
          font-size: 3rem;
          margin-left: rem;
        }
      }
    }
  }
}
</style>