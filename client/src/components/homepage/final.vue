<template>
  <v-container>
    <div class="text-center">
      <h1 class="display-1 font-weight-thin mb-4">Recapitulatif</h1>
    </div>

    <div class="elevation-3 text-center">
      <v-sheet color="teal" dark>Hello, world! I'm a simple v-sheet</v-sheet>
    </div>

    <v-card class="mx-auto" max-width="345">
      <v-toolbar color="teal" dark>
        <v-toolbar-title>Consultation</v-toolbar-title>

        <div class="flex-grow-1"></div>
      </v-toolbar>

      <v-card-text>
        <div>Nom complet</div>
        <p class="display-1 font-weight-thin text--primary">{{getFirstname + ' ' + getName }}</p>
        <p>Telephone</p>
        <div class="display-1 font-weight-thin text--primary">{{ getPhone }}</div>
        <p>Genre</p>
        <div class="display-1 font-weight-thin text--primary">{{ getGenre }}</div>

        <p>Jour</p>
        <div class="display-1 font-weight-thin text--primary">{{ getJour }}</div>
        <p>Heure</p>
        <div class="display-1 font-weight-thin text--primary">{{ getHeure }}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="teal" class="white--text" @click="register">Valider</v-btn>
        <v-btn color="error" class="white--text" @click="toHours">Annuler</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

//todo Responsivness for mobil devices

export default {
  data: () => ({}),
  computed: {
    ...mapGetters([
      "getName",
      "getFirstname",
      "getPhone",
      "getGenre",
      "getJour",
      "getHeure"
    ])
  },
  methods: {
    ...mapMutations(["toHours", "register"])
  }
};
</script>

<style lang='scss' scoped >
.container {
  .text-center {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .elevation-3{
    width: 70%;
    height: 30px;
    margin: auto;
  }
}
</style>