<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-form ref="form" >
        <v-toolbar color="teal" dark>
          <v-toolbar-title>Formulaire</v-toolbar-title>
        </v-toolbar>
        <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Nom" required></v-text-field>

        <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Prénom" required></v-text-field>

        <v-text-field v-model="telephone" :rules="telephoneRules" label="Télephone" required></v-text-field>

        <div class="radioCercles">
          <p>Je suis :</p>

          <v-radio-group v-model="row" row>
            <v-radio label="Un homme" value="radio-1"></v-radio>
            <v-radio label="Une femme" value="radio-2"></v-radio>
          </v-radio-group>
        </div>
        <v-col class="text-center" cols="12">
          <v-btn :disabled="!valid" color="teal" class="white--text mr-4" @click="validate">Validate</v-btn>

          <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>
        </v-col>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
// todo responsiveness for mobiles

export default {
  data: () => ({
    row: null
  })
};
</script>

<style lang='scss' scoped>
.container {
  .row {
    padding-top: 7rem;
    .v-form {
      background-color: #fff;
      width: 800px !important;

      .v-toolbar {
        margin-bottom: 1rem;
      }

      .v-text-field {
        width: 95%;
        margin: auto;
      }

      .radioCercles {
        margin-left: 1rem;
      }
    }
  }
}
</style>