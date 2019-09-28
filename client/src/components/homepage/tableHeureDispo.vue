<template>
  <div class="bigBox">
    <div class="text-center">
      <h1 class="display-1 font-weight-thin mb-4"> Choississez une heure  </h1>
    </div>

    <v-data-table
      v-model="selected"
      :items="dispo"
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
          <v-btn  color="teal" class="white--text mr-4" @click="validate">Validate</v-btn>

          <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>
        </v-col>
  </div>
</template>

<script>
export default {


  data() {
    return {
      singleSelect: true ,
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
      ],

      dispo: [
        {
          name: "Dr Omar Nour Fara",
          disponiblité: "occupé",
          heure: "8:00"
        },
        {
          name: "Dr Roda Youssouf Adaweh",
          disponiblité: "libre",
          heure: "8:30"
        },
        {
          name: "Dr Moussa Mounin Mouktar",
          disponiblité: "libre",
          heure: "9:00"
        },
        {
          name: "Dr Osman Abdikarim Mohamed",
          disponiblité: "occupé",
          heure: "9:30"
        },
        {
          name: "Dr Filsan Moumin Moussa",
          disponiblité: "libre",
          heure: "10:00"
        },
        {
          name: "Zakaria Muhyadin Ali",
          disponiblité: "libre",
          heure: "10:30"
        },
        {
          name: "Dr Abdirahman Ali Hassan",
          disponiblité: "libre",
          heure: "11:00"
        },
        {
          name: "Dr Houssein Khaire Yonis",
          disponiblité: "occupé",
          heure: "11:30"
        },
        {
          name: "Dr Nima Mohamed Sarah",
          disponiblité: "libre",
          heure: "12:00"
        },
        {
          name: "Dr Amina Ahmed Moussa",
          disponiblité: "occupé",
          heure: "12:30"
        }
      ]
    };
  },
  methods: {
    getColor(disponiblité) {
      if (disponiblité === "occupé") return "red";
      else return "teal";
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