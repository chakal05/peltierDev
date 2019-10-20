<template>
  <v-container>
    <div class="text-center titre">
      <h1 class="display-2 font-weight-thin mb-4">Entrez vos coordonnées</h1>
    </div>

    <v-row align="center" justify="center">
      <v-form ref="form" lazy-validation v-model="valid" class="elevation-5">
        <v-toolbar color="teal darken-4" dark>
          <v-toolbar-title>Formulaire</v-toolbar-title>
        </v-toolbar>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="firstname" :rules="nameRules" label="Prénom" required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="name" :rules="nameRules" label="Nom" required></v-text-field>
          </v-col>
          <v-col cols="12" >
            <v-text-field
              v-model="telephone"
              :counter="8"
              :rules="telephoneRules"
              label="Télephone"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              :items="genre"
              :rules="[v => !!v || 'Entrez votre genre pour continuer']"
              v-model="gender"
              label="Genre"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" >
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field v-model="date" label="Date" prepend-icon="event" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker color="teal darken-4" v-model="date" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="teal darken-4" @click="modal = false">Cancel</v-btn>
                <v-btn text color="teal darken-4" @click="$refs.dialog.save(date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
        </v-row>

        <v-col class="text-center boutonBox" cols="12">
          <v-btn
            :disabled="!valid"
            color="teal darken-4"
            class="white--text mr-4"
            @click="validate"
          >Valider</v-btn>

          <v-btn color="error" class="mr-4" @click="reset">Retourner</v-btn>
        </v-col>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data: () => ({
    row: null,
    valid: true,
    name: "",
    firstname: "",
    date: new Date().toISOString().substr(0, 10),
    modal: false,
    genre: ["Homme", "Femme"],
    gender: "",
    telephone: null,
    nameRules: [
      v => !!v || "Le nom est requis",
      v => isNaN(v) || "Le nom ne doit contenir aucun chiffre"
    ],
    telephoneRules: [
      v => !!v || "Le numéro de téléphone est requis",
      v =>
        (v && v.length >= 8) ||
        "Le numéro de téléphone doit avoir 8 caractere au minimum",
      v => !isNaN(v) || "Le numéro de téléphone doit etre numerique"
    ]
  }),

  methods: {
    ...mapMutations([
      "setName",
      "setFirstname",
      "setNumber",
      "setGenre",
      "toHomeView",
      "setJour",
      "toHours"
    ]),

    getDate() {
      // Get today'date and compare it to the picked date.
      //If picked date is previous than today's date, alert them to choose a new date

      if (this.date) {
        if (
          new Date(this.date).getDate() === new Date().getDate() ||
          new Date(this.date).getTime() > new Date().getTime()
        ) {
          if (
            new Date(this.date).getDay() === 5 ||
            new Date(this.date).getDay() === 6
          ) {
            alert("Pas de consultation pendant les weekends");
          }
        } else {
          alert("La date choissie est passee");
        }
      }
    },

    validate() {
      if (this.$refs.form.validate()) {
        this.setName(this.name);
        this.setFirstname(this.firstname);
        this.setNumber(this.telephone);
        this.setGenre(this.gender);
        this.setJour(this.date);
        this.toHours();
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
  margin-top: 5rem;

  @media (max-width: 800px) {
    margin-top: 3rem;
  }

  .titre {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .row {
    .v-form {
      background-color: #fff;
      width: 50% !important;

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

        .v-radio {
          margin: 0.5rem;
        }
      }

      .boutonBox {
        margin-bottom: 1rem;
        margin-top: 2rem;

        .v-btn {
          margin: 0.5rem;
        }
      }
    }
  }
}
</style>