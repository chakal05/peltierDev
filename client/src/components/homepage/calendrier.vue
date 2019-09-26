<template>
<v-container>


  <v-row align="center" justify='center' >

    <h2> Choississez une date svp  </h2>
 

    <v-date-picker
      v-model="date"
      width="290"
      
    ></v-date-picker>
  </v-row>

  </v-container>
</template>

<script>
export default {
    data: () => ({
      date: new Date().toISOString().substr(0, 10),
    }),
}
</script>

<style lang='scss' scoped>
.row{
    padding-top: 9rem;
}
</style>