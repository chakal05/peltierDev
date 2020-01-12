<template>
  <v-item-group>
    <v-container>
      <v-row align='center' justify='center'>
        <v-col cols="12" md="3">
          <v-item v-slot:default="{ active, toggle }">
            <v-card
              :color="active ? 'grey darken-4' : ''"
              class="d-flex align-center"
              height="200"
              @click="toggle"
            >
              <v-card-text class="display-3 flex-grow-1 text-center" v-if="!active">
                <v-icon>fas fa-user</v-icon>
                <h3 class="display-2 font-weight-thin">Patients</h3>
              </v-card-text>
              <div v-if="active" class="display-3 flex-grow-1 text-center"></div>
              <div>
                <div v-if="active" class="display-3 text-center white--text">coming soon</div>
              </div>
            </v-card>
          </v-item>
        </v-col>

         <v-col cols="12" md="3">
          <v-item v-slot:default="{ active, toggle }">
            <v-card
              :color="active ? 'grey darken-4' : ''"
              class="d-flex align-center"
              height="200"
              @click="showBookings"
            >
              <v-card-text class="display-3 flex-grow-1 text-center" v-if="!active">
                <v-icon>fas fa-calendar-alt</v-icon>
                <h3 class="display-2 font-weight-thin">Appointment</h3>
              </v-card-text>
              <div v-if="active" class="display-3 flex-grow-1 white--text text-center">Coming soon</div>
            </v-card>
          </v-item>
        </v-col>

        <v-col cols="12" md="3">
          <v-item v-slot:default="{ active, toggle }">
            <v-card
              :color="active ? 'grey darken-4' : ''"
              class="d-flex align-center"
              height="200"
              @click="toggle"
            >
              <v-card-text class="display-3 flex-grow-1 text-center" v-if="!active">
                <v-icon>fas fa-bed</v-icon>
                <h3 class="display-2 font-weight-thin">Bed allotment</h3>
              </v-card-text>
              <div v-if="active" class="display-3 flex-grow-1 white--text text-center">Coming soon</div>
            </v-card>
          </v-item>
        </v-col>

        <v-col cols="12" md="3">
          <v-item v-slot:default="{ active, toggle }">
            <v-card
              :color="active ? 'grey darken-4' : ''"
              class="d-flex align-center"
              height="200"
              @click="toggle"
            >
              <v-card-text class="display-3 flex-grow-1 text-center" v-if="!active">
                <v-icon>fas fa-tint</v-icon>
                <h3 class="display-2 font-weight-thin">Blood bank</h3>
              </v-card-text>
              <div v-if="active" class="display-3 flex-grow-1 white--text text-center">Coming soon</div>
            </v-card>
          </v-item>
        </v-col>

        <v-col cols="12" md="3">
          <v-item v-slot:default="{ active, toggle }">
            <v-card
              :color="active ? 'grey darken-4' : ''"
              class="d-flex align-center white--text"
              height="200"
              @click="toggle"
            >
              <v-card-text class="display-3 flex-grow-1 text-center" v-if="!active">
                <v-icon>fas fa-book</v-icon>
                <h3 class="display-2 font-weight-thin">Rapports</h3>
              </v-card-text>
              <div v-if="active" class="display-3 flex-grow-1 white--text text-center">Coming soon</div>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
//import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    //...mapGetters(["getDashboard", "getBookings", "getDoctors"])
  },
  methods: {
 //   ...mapMutations(["showDashboard", "showBookings", "showDoctors"])
  }
};
</script>

<style lang='scss' scoped>
.container {
  .row {
    .v-card {
      .v-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
    }
  }
}
</style>