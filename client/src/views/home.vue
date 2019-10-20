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
      <home v-if="showHome"></home>
    <patientInfo v-if="showForm"></patientInfo>
    <availableHours v-if="showHours"></availableHours>
    <sendForm v-if="showRecap"></sendForm>
    </div>
    
  </v-container>
</template>


<script>
import home from "../components/homepage/home";
import patientInfo from "../components/homepage/form";
import availableHours from "../components/homepage/availableHours";
import sendForm from "../components/homepage/sendForm";
import { mapGetters } from "vuex";

export default {
  name: "landingPage",
  components: {
    home,
    patientInfo,
    availableHours,
    sendForm
  },
  data: () => ({
    //
  }),

  computed: {
    ...mapGetters([
      "showHome",
      "showForm",
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
 .container{
   .v-toolbar{
     padding-left: .5rem;
   }

   .logo{
     .v-icon{
       font-size: 3rem;
     }
   }
 }
</style>
