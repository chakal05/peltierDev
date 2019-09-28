<template>
  <div class="bigBox">
    <div class="text-center">
      <h1 class="display-1 font-weight-thin mb-4">Choississez une heure</h1>
    </div>

    <v-data-table
      v-model="selected"
      :items="getHours"
      show-select
      :single-select="singleSelect"
      :headers="headers"
      item-key="name"
      class="elevation-1"
    >
      <template v-slot:item.disponiblité="{ item }">
        <v-chip :color="getColor(item.disponiblité)" dark>{{ item.disponiblité }}</v-chip>
      </template>
    </v-data-table>

    <v-col class="text-center" cols="12">
      <v-btn color="teal" class="white--text mr-4" @click="loadhours">Validate</v-btn>

      <v-btn color="error" class="mr-4">Reset Form</v-btn>
    </v-col>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from 'axios';
export default {
  data() {
    return {
      singleSelect: true,
      selected: [],
      headers: [
        {
          text: "Nom du docteur ",
          align: "left",
          sortable: false,
          value: "name"
        },

        { text: "Heure de consultation", value: "heure" },
        { text: "disponiblité", value: "disponiblité" }
      ]
    };
  },

  computed: {
    ...mapGetters(["getHours"])
  },

  methods: {
 //   ...mapActions("loadhours"),

  //  created() {
  //    this.loadHours();
  //  },

    getColor(disponiblité) {
      if (disponiblité === "occupé") return "red";
      else return "teal";
    },

     loadhours() {
     const response = axios.get("/loadHours");
  
   }
  }
};
</script>

<style lang='scss' scoped>
.bigBox {
  .text-center {
    margin-top: 1rem;
    margin-bottom: 2rem;
  }

  .elevation-1 {
    margin-bottom: 3rem;
  }
}
</style>