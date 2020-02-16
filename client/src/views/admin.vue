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
          <v-app-bar-nav-icon
            class="bar"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
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
              <v-list-item-title>Bookings</v-list-item-title>
            </router-link>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>fas fa-user</v-icon>
            </v-list-item-icon>

            <router-link to="/admin/patientList">
              <v-list-item-title>Patients</v-list-item-title>
            </router-link>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>fas fa-bed</v-icon>
            </v-list-item-icon>

            <router-link to="/admin/bedAllotment">
              <v-list-item-title>Bed allotment</v-list-item-title>
            </router-link>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>account_box</v-icon>
            </v-list-item-icon>

            <router-link to="/admin/profil">
              <v-list-item-title>Profil</v-list-item-title>
            </router-link>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>fas fa-book</v-icon>
            </v-list-item-icon>

            <router-link to="/admin/rapport">
              <v-list-item-title>Rapport</v-list-item-title>
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
            <span> {{ newMess }} </span>
          </template>
          <router-link to="/admin/messages">
            <v-icon>mdi-email</v-icon>
          </router-link>
        </v-badge>

        <v-btn text>{{ userName }}</v-btn>
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
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  name: "admin",
  data: () => ({
    drawer: null,
    show: true,
    userName: localStorage.getItem("tokenUserName"),
    finns: false
  }),
  computed: { ...mapGetters(["newMess"]) },
  created() {
    //get number of unread messages
    this.notifyMessages();

    // get number of unread messages every 3 seconds
    this.getUnread();
  },

  methods: {
    ...mapMutations(["logOut", "stopTimer"]),

    ...mapActions(["getUnread", "notifyMessages"])
  },

  beforeDestroy() {
    this.stopTimer();
  }
};
</script>

<style  lang='scss' scoped>
@mixin desktop() {
  @media (max-width: 1264px) {
    @content;
  }
}

@mixin tablette() {
  @media (max-width: 761px) {
    @content;
  }
}
.container {
  a {
    text-decoration: none;
    color: white;
  }

  .v-application--wrap {
    .v-navigation-drawer {
      .logo-gris {
        display: none;

        @include desktop {
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
        @include desktop() {
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

        @include tablette {
          display: none;
        }
      }

      .v-badge {
        margin: 2.5rem !important;

        @include tablette {
          margin-top: 2.7rem !important;
          margin-right: 1rem !important;
        }

        .v-icon {
          margin-right: -0.5rem;
        }
      }

      .v-btn {
        @media (max-width: 320px) {
          margin-right: -1rem;
          font-size: 0.9rem;
        }
      }
    }
  }
}
</style>