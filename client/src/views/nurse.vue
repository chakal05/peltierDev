<template>
  <v-container id="admin">
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

            <router-link to="/nurse/nurseDash">
              <v-list-item-title>Dashboard</v-list-item-title>
            </router-link>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>schedule</v-icon>
            </v-list-item-icon>

            <router-link to="/nurse/bookings">
              <v-list-item-title>Bookings </v-list-item-title>
            </router-link>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>fas fa-user</v-icon>
            </v-list-item-icon>

            <router-link to="/nurse/patientList">
              <v-list-item-title>Patients</v-list-item-title>
            </router-link>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>fas fa-bed</v-icon>
            </v-list-item-icon>

            <router-link to="/nurse/bedAllotment">
              <v-list-item-title>Bed allotment</v-list-item-title>
            </router-link>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>fas fa-book</v-icon>
            </v-list-item-icon>

            <router-link to="/nurse/rapport">
              <v-list-item-title>Rapport</v-list-item-title>
            </router-link>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>account_box</v-icon>
            </v-list-item-icon>

            <router-link to="/nurse/profil">
              <v-list-item-title>Profil</v-list-item-title>
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

        <v-col cols="12" sm="4" md="1" class="mt-7">
          <div class="text-center">
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn text v-on="on">
                  {{ userName }}
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in overflow"
                  :key="index"
                  @click="logOut"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-col>
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
props:{
SideNavInfo: Array
},
  data: () => ({
    drawer: null,
    show: true,
    userName: localStorage.getItem("tokenUserName"),
    overflow: [{ title: "Log out" }],
    SideNavInfo:[{

    }]
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

  // Destoy setIntervall

  beforeDestroy() {
    this.stopTimer();
  }
};
</script>
<style  lang='scss' scoped>
@import '../assets/styles/_settings.scss';
@import '../assets/styles/_views.scss';
</style>