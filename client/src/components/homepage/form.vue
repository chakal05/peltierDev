<template>
  <v-container>
    <div class="text-center titre">
      <h1 class="display-2 font-weight-thin mb-4">Entrez vos coordonnées</h1>
    </div>

    <v-row align="center" justify="center">
      <v-form ref="form" lazy-validation v-model="valid" class="elevation-5">
        <v-toolbar color="teal" dark>
          <v-toolbar-title>Formulaire</v-toolbar-title>
        </v-toolbar>

        <v-text-field v-model="firstname" :rules="nameRules" label="Prénom" required></v-text-field>
        <v-text-field v-model="name" :rules="nameRules" label="Nom" required></v-text-field>
        <v-text-field
          v-model="telephone"
          :counter="8"
          :rules="telephoneRules"
          label="Télephone"
          required
        ></v-text-field>

        <div class="radioCercles">
          <p>Je suis :</p>

          <v-radio-group
            v-model="genre"
            row
            required
            :rules="[v => !!v || 'Entrez votre genre pour continuer']"
          >
            <v-radio label="Un homme" value="homme"></v-radio>
            <v-radio label="Une femme" value="femme"></v-radio>
          </v-radio-group>
        </div>
        <v-col class="text-center boutonBox" cols="12">
          <v-btn :disabled="!valid" color="teal" class="white--text mr-4" @click="validate">Valider</v-btn>

          <v-btn color="error" class="mr-4" @click="reset">Annuler</v-btn>
        </v-col>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
// todo responsiveness for mobiles

import {mapMutations} from 'vuex';

export default {
  data: () => ({
    row: null,
    valid: true,
    name: "",
    firstname: "",
    genre: "",
    telephone: null,
    nameRules: [
      v => !!v || "Le nom est requis",
      v => isNaN(v) || "Le nom ne doit contenir aucun chiffre"
    ],
    telephoneRules: [
      v => !!v || "Le numéro de téléphone est requis",
      v =>
        (v && v.length <= 8) ||
        "Le numéro de téléphone doit avoir 8 caractere au max",
      v => !isNaN(v) || "Le numéro de téléphone doit etre numerique"
    ]
  }),

  methods: {
    ...mapMutations(['setName', 'setFirstname', 'setNumber', 'setGenre', 'toHomeView', 'toCalendar']),

    validate() {
      if (this.$refs.form.validate()) {
        this.setName(this.name);
        this.setFirstname(this.firstname);
        this.setNumber(this.telephone);
        this.setGenre(this.genre);
        this.toCalendar();

      }
    },
    reset() {
      this.$refs.form.reset();
      this.toHomeView();
    }
  }
};
</script>

<style lang='scss' scoped>
.container {
  .titre {
    margin-top: 2rem;
    margin-bottom: 3rem;
  }

  .row {
    .v-form {
      background-color: #fff;
      width: 70% !important;

      .v-toolbar {
        margin-bottom: 1rem;
      }

      .v-text-field {
        width: 95%;
        margin: auto;
      }

      .radioCercles {
        margin-top: 1rem;
        margin-left: 1.2rem;
      }

      .boutonBox {
        margin-bottom: 1rem;
        margin-top: 2rem;
      }
    }
  }
}
</style>