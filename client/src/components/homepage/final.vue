<template>
  <v-container>
    <div class="text-center">
      <h1 class="display-1 font-weight-thin mb-4">Recapitulatif</h1>
    </div>

    <v-card class="mx-auto" max-width="345">
      <v-toolbar color="teal" dark>
        <v-toolbar-title>Consultation</v-toolbar-title>

        <div class="flex-grow-1"></div>
      </v-toolbar>

      <v-card-text>
        <div>Nom complet</div>
        <p class="display-1 font-weight-thin text--primary">Zeinab Mohamed Khaire</p>
        <p>Telephone</p>
        <div class="display-1 font-weight-thin text--primary">0733422476</div>
        <p>Genre</p>
        <div class="display-1 font-weight-thin text--primary">Femme</div>

        <p>Jour</p>
        <div class="display-1 font-weight-thin text--primary">2019-09-28</div>
        <p>Heure</p>
        <div class="display-1 font-weight-thin text--primary">10 : 30</div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="teal" class="white--text">Valider</v-btn>
         <v-btn color="error" class="white--text" @click="toHours">Annuler</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>

import { mapMutations } from "vuex";

//todo Responsivness for mobil devices

export default {
  data: () => ({
    
  }),

  methods : {
    ...mapMutations(['toHours'])
  }
};
</script>

<style lang='scss' scoped >
.container {
  .text-center {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  
}
</style>