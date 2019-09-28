<template>
  <v-container>
    <div class="text-center">
      <h1 class="display-2 font-weight-thin mb-4">Choississez une date</h1>
    </div>

    <v-row align="center" justify="center">
      <v-date-picker color="teal" v-model="date" width="700"></v-date-picker>
    </v-row>
  </v-container>
</template>

<script>
//todo responsiveness for mobiles devices
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10)
  })
};
</script>

<style lang='scss' scoped>
.text-center {
  margin-top: 7rem;
  margin-bottom: 4rem;
}
</style>