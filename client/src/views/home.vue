
<template>
  <v-container>
   <!--
      <firstView v-if="firstView"></firstView>
 
   <calendrier></calendrier>
    <form1 ></form1>
     -->

     <tableau></tableau>
  </v-container>
</template>


<script>
// import firstView from "../components/homepage/firstView";
//import form1 from "../components/homepage/form";
//import calendrier from "../components/homepage/calendrier"
//import { mapState } from "vuex";
import tableau from '../components/homepage/tableHeureDispo'
export default {
  name: "landingPage",
  components: {
   // firstView,
//  form1,
  //  calendrier,
  tableau

  },
  props: {
    source: String
  },
  data: () => ({
    //
      }),

  computed: {
  //  ...mapState(["firstView", "formulaire"])
  },

  methods: {
    //
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
</style>
