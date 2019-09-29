<template>
  <v-container>
    <firstView v-if="showFirst"></firstView>
    
    <form1 v-if="showForm" ></form1>
    
    <calendrier v-if="showCalendar"></calendrier>
    
    <tableau v-if="showHours"></tableau>
    
    <recap v-if="showRecap"></recap>
  
  </v-container>
</template>


<script>
import firstView from "../components/homepage/firstView";
import form1 from "../components/homepage/form";
import calendrier from "../components/homepage/calendrier";
import tableau from '../components/homepage/tableHeureDispo'
import recap from "../components/homepage/final";
import { mapGetters} from "vuex";

export default {
  name: "landingPage",
  components: {
    firstView,
     form1,
     calendrier,
     tableau,
     recap
  },
  data: () => ({
    //
  }),

 computed: {
    ...mapGetters(["showFirst", "showForm", "showCalendar" , "showHours", "showRecap"])
  },

  methods: {
   //
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
</style>
