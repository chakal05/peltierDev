<template>
  <v-container>

   <v-app-bar absolute >

        <v-toolbar-title>Manedek Medical Center</v-toolbar-title>
          
        <div class="logo">
          <v-icon color="teal darken-4">local_hospital</v-icon>
        </div>
        <div class="flex-grow-1"></div>
      </v-app-bar>


    <div>
      <firstView v-if="showFirst"></firstView>
    <formulaire v-if="showForm"></formulaire>
    <calendrier v-if="showCalendar"></calendrier>
    <tableau v-if="showHours"></tableau>
    <recap v-if="showRecap"></recap>
    </div>
    
  </v-container>
</template>


<script>
import firstView from "../components/homepage/firstView";
import formulaire from "../components/homepage/form";
import calendrier from "../components/homepage/calendrier";
import tableau from "../components/homepage/dispoHours";
import recap from "../components/homepage/final";
import { mapGetters } from "vuex";

export default {
  name: "landingPage",
  components: {
    firstView,
    formulaire,
    calendrier,
    tableau,
    recap
  },
  data: () => ({
    //
  }),

  computed: {
    ...mapGetters([
      "showFirst",
      "showForm",
      "showCalendar",
      "showHours",
      "showRecap"
    ])
  },

  methods: {
    //
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
 
</style>
