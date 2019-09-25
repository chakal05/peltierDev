
<template>
  <v-container>
    <firstView v-if="firstView"></firstView>
    <form1 v-if="formulaire"></form1>
  </v-container>
</template>


<script>
import firstView from "../components/homepage/firstView";
import form1 from "../components/homepage/form";
import { mapState } from "vuex";
export default {
  name: "landingPage",
  components: {
    firstView,
    form1,
    
  },
  props: {
    source: String
  },
  data: () => ({
    first: true,
    form: false
  }),

  computed: {
    ...mapState(["firstView", "formulaire"])
  },

  methods: {
    //
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
</style>
