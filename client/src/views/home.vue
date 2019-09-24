
<template>
<v-container>

<firstView></firstView>

</v-container>
</template>


<script>
import firstView from "../components/homepage/firstView";
export default {
  name: "landingPage",
  components: {
    firstView
  },
  props: {
    source: String
  },
  data: () => ({
  }),
  methods: {
   
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>

</style>
