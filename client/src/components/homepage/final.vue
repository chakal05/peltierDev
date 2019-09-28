<template>
  <v-container>
    <div class="text-center">
      <h1 class="display-1 font-weight-thin mb-4">Recapitulatif</h1>
    </div>

    <v-card class="mx-auto" max-width="345" height='400'>
      <v-toolbar color="teal" dark>
        <v-toolbar-title>Consultation</v-toolbar-title>

        <div class="flex-grow-1"></div>
      </v-toolbar>

      <v-card-text>
        <div>Patient(e)</div>
        <p class="display-1 text--primary">Nom du patient</p>
        <p>Coordonnees</p>
        <div class="text--primary">
          Numero de telephone
        
        </div>
        <br />

       <p>Date</p>
        <div class="text--primary">
          Jour
          <br />Heure
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="teal" class="white--text"> Valider </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped >

.container {

.text-center{
    margin-top: 5rem;
    margin-bottom: 2rem;
}


}
</style>