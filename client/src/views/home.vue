<template>
  <v-container>
   
    <tableau ></tableau>
    
    <!--
     v-if="showHours"

    <firstView v-if="showFirst"></firstView>

   <formulaire v-if="showForm" ></formulaire>

      
 <calendrier  v-if="showCalendar"></calendrier>
 
    
    <recap v-if="showRecap"></recap>

    -->
  </v-container>
</template>


<script>
//import firstView from "../components/homepage/firstView";
//import formulaire from "../components/homepage/form";
//import calendrier from "../components/homepage/calendrier";
import tableau from '../components/homepage/dispoHours'
//import recap from "../components/homepage/final";
//import { mapGetters} from "vuex";

export default {
  name: "landingPage",
  components: {
    //firstView,
   // formulaire
    // calendrier,
     tableau,
    // recap
  },
  data: () => ({
    //
  }),

  computed: {
    //  ...mapGetters(["showFirst", "showForm", "showCalendar" , "showHours", "showRecap"])
  },

  methods: {
    //
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
//
</style>
