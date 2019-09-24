<template>
  <v-container>
   <firstVIew></firstVIew>
  </v-container>
</template>

<script>
import firstVIew from "../components/homepage/firstVIew";
export default {
  name: "home",
  components: {
    firstVIew
  },

  data: () => ({
    first: false
  })
};
</script>

<style>
</style>