<template>
  <v-container>
    <div class="text-center">
      <h1 class="display-2 font-weight-thin mb-4">Choississez une date</h1>
    </div>

    <v-row align="center" justify="center">
      <v-date-picker
        color="teal"
        v-model="picker"
        locale="fr-fr"
        full-width
        :landscape="$vuetify.breakpoint.smAndUp"
        class="mt-4"
      ></v-date-picker>
    </v-row>

    <v-col class="text-center boutonBox" cols="12">
      <h3 class="red--text font-weight-thin mb-4">{{error}}</h3>
      <v-btn color="teal" class="white--text mr-4" @click="getDate">Valider</v-btn>

      <v-btn color="error" class="mr-4" @click="toFormulaire">Annuler</v-btn>
    </v-col>
  </v-container>
</template>

<script>
//todo responsiveness for mobiles devices

import { mapMutations } from "vuex";
export default {
  data: () => ({
    picker: new Date().toISOString().substr(0, 10),
    fafa: "from data",
    error: null
  }),

  methods: {
    ...mapMutations(["setJour" , "toHours", "toFormulaire"]),

    getDate() {
      // Get today'date and compare it to the picked date.
      //If picked date is previous than today's date, alert them to choose a new date

      let idag = new Date().toISOString().substr(0, 10);
      let today = new Date(idag);
      let pickedDate = new Date(this.picker);

      if (this.picker) {
        if (pickedDate.getTime() > today.getTime()) {
          if (pickedDate.getDay() === 5 || pickedDate.getDay() === 6) {
            this.error = "Pas de consultation pendant les weekends";
          } else {
            this.setJour(this.picker);
            this.error = null;
            this.toHours();
          }
        } else {
          this.error = "La date choissie est déja passée";
        }
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.container {
  .text-center {
    margin-top: 4rem;
    margin-bottom: 3rem;
  }

  .row {
    width: 70% !important;
    margin: auto;
  }
}
</style>