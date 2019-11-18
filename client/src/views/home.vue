<template>
  <v-container>
    <v-app-bar absolute>
      <v-toolbar-title>Manedek Medical Center</v-toolbar-title>

      <div class="logo">
        <v-icon color="teal darken-4">local_hospital</v-icon>
      </div>
      <div class="flex-grow-1"></div>
    </v-app-bar>

    <div>
      <home v-if="showHome"></home>
      <patientInfo v-if="showForm"></patientInfo>
    </div>
  </v-container>
</template>


<script>
import home from "../components/homepage/home";
import patientInfo from "../components/homepage/form";
import { mapGetters } from "vuex";

export default {
  name: "landingPage",
  components: {
    home,
    patientInfo
  },
  data: () => ({
    //
  }),

  computed: {
    ...mapGetters(["showHome", "showForm"])
  },

  methods: {
    //
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.container {
  .v-toolbar {
    padding-left: 0.5rem;
  }

  .logo {
    .v-icon {
      font-size: 3rem;
    }
  }
}
</style>
