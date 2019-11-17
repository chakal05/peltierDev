<template>
  <v-container class="bigBox">
    <div class="text-center">
      <h1 class="display-2 font-weight-thin mb-4">Les heures disponibles :</h1>
    </div>

    <v-item-group>
      <v-container>
        <v-row align='center' justify='center'>
          <v-col v-for="(hour,index) in getHours" :key="index" cols="12" md="4">
            <v-item v-slot:default="{ active, toggle }">
              <v-card
                :color="active ? 'teal darken-4' : 'teal lighten-1'"
                class="d-flex align-center"
                height="71"
                @click="toggle"
              >
                <v-card-title @click="getTime" class="white--text">{{ hour }} </v-card-title>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>

    <v-col class="text-center" cols="12">
      <h3 class="red--text font-weight-thin mb-4">{{ error}}</h3>

      <v-btn color="teal darken-4" class="white--text mr-4" @click="validate">Validate</v-btn>

      <v-btn color="error" class="mr-4" @click="toFormulaire">Retourner</v-btn>
    </v-col>
  </v-container>
</template>

<script>
// todo responsiveness

import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      error: null,
      time: null
    };
  },

  computed: {
    ...mapGetters(["getHours"])
  },

  methods: {
    ...mapActions(["loadHours"]),

    ...mapMutations(["toRecap", "toFormulaire", "setTime"]),

    validate() {
      if (!this.time) {
        this.error = "Vous devez choisir une heure de visite";
      } else {
        this.setTime(this.time);
        this.toRecap();
      }
    },

    getTime(event) {
      let item = event.target.innerText;

      if (item) {
        this.time = item;
      }
    }
  },

  created() {
    this.loadHours();
  }
};
</script>

<style lang='scss' scoped>
.container {
  margin-top: 2rem;
  .text-center {
    margin-top: 4rem;
    margin-bottom: 4rem;

    @media (max-width: 960px){
       margin-top: 2rem;
    margin-bottom: 1rem;
    }
  }

  .row {
    width: 80%;
    margin: auto;

    .v-card {
      .v-card__title {
        margin: auto;
        width: 100%;
      }
    }
  }
}
</style>