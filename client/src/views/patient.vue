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

            <v-list-item-content>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>fas fa-calendar-alt</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Appoitment</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>fas fa-stethoscope</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Prescription</v-list-item-title>
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
              <dashboard></dashboard>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </v-container>
</template>

<script>
import dashboard from "../components/patient/dashboard";
export default {
  name: "patient",
  components: {
    dashboard
  },

  computed: {
    //
  },
  data: () => ({
    drawer: null
  }),

  methods: {
    //
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
    }
  }
}
</style>