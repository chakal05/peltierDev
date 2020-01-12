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
          <v-list-item>
            <v-list-item-icon>
              <v-icon>dashboard</v-icon>
            </v-list-item-icon>

            <router-link to="/admin/adminDash">
              <v-list-item-title>Dashboard</v-list-item-title>
            </router-link>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>fas fa-user-md</v-icon>
            </v-list-item-icon>
            <router-link to="/admin/adminDoc">
              <v-list-item-title>Doctors</v-list-item-title>
            </router-link>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>fas fa-plus-square</v-icon>
            </v-list-item-icon>

            <router-link to="/admin/adminNurse">
              <v-list-item-title>Nurses</v-list-item-title>
            </router-link>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>schedule</v-icon>
            </v-list-item-icon>

            <router-link to="/admin/bookings">
              <v-list-item-title>Appointments</v-list-item-title>
            </router-link>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>fas fa-user</v-icon>
            </v-list-item-icon>

            <router-link to="/admin/patient">
              <v-list-item-title>Patients</v-list-item-title>
            </router-link>
          </v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
              <v-btn color="white" @click="logOut" light block>Logout</v-btn>
           
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

        <v-badge color="teal darken-4">
          <template v-slot:badge>
            <a href="#">
              <span>4</span>
            </a>
          </template>
          <a href="#">
            <v-icon>mdi-bell</v-icon>
          </a>
        </v-badge>
        <v-badge color="orange">
          <template v-slot:badge>
            <router-link to="/admin/messages">
              <span>6</span>
            </router-link>
          </template>
          <router-link to="/admin/messages">
            <v-icon>mdi-email</v-icon>
          </router-link>
        </v-badge>

        <v-btn>{{ userName }}</v-btn>
      </v-app-bar>

      <v-content>
        <v-container fill-height>
          <v-layout justify-center align-center>
            <v-flex>
              <router-view />
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "admin",
  components: {
    //
  },

  computed: {},
  data: () => ({
    drawer: null,
    show: true,
    userName: localStorage.getItem("tokenUserName")
  }),

  methods: {
    ...mapMutations(["logOut"])
  }
};
</script>

<style  lang='scss' scoped>
.container {
  a {
    text-decoration: none;
    color: white;
  }

  .v-application--wrap {
    .v-navigation-drawer {
      .logo-gris {
        display: none;

        @media (max-width: 1264px) {
          display: block;
        }

        .bar {
          margin-left: 0.5rem;
          margin-top: 0.7rem;
        }

        .v-toolbar__title {
          position: relative;
          top: -2.7rem;
          left: 3.3rem;
          font-size: 2rem;

          .v-icon {
            font-size: 2rem;
            margin-left: 0.5rem;
            margin-top: -0.3rem;
          }
        }
      }

      .v-list {
        @media (max-width: 1264px) {
          margin-top: -2rem;
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
          margin-left: 0rem;
        }
      }

      .v-badge {
        margin: 1.5rem !important;

        .v-icon {
          margin-right: -0.7rem;
        }
      }

      .v-avatar {
        margin-left: 1rem;
        margin-top: -0.5rem;
        a {
          img {
            height: 3rem;
            width: 3rem;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>