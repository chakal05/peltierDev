<template>
  <v-container>
    <div class="text-center titre">
      <h1 class="display-2 font-weight-thin mb-4">Entrez vos coordonnées</h1>
    </div>

    <v-alert
      v-if="success"
      class="mx-auto text-center font-weight-bold"
      max-width="800"
      type="teal"
    >
      Votre rendez-vous a été enregistré. Vous serez automatiquement
      redirigé vers la page d'acceuil. Merci et Bienvenue !
    </v-alert>

    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step color="teal darken-4" :complete="e1 >1" step="1">Enter your information</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step color="teal darken-4" :complete="e1 > 2" step="2">Choose a time</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step color="teal darken-4" step="3">Control and submit</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-12" height="400px">
            <br />
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="firstname"
                  :rules="nameRules"
                  :counter="10"
                  label="First name"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="lastname"
                  :rules="nameRules"
                  :counter="10"
                  label="Last name"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field
                  v-model="telephone"
                  :rules="telephoneRules"
                  label="Telephone"
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

              <v-col cols="12" md="6">
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="Date"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker color="teal darken-4" v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="teal darken-4" @click="modal = false">Cancel</v-btn>
                    <v-btn text color="teal darken-4" @click="$refs.dialog.save(date)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
            </v-row>
          </v-card>

          <v-btn color="teal darken-4" class="white--text" @click="validate">Continue</v-btn>

          <v-btn text @click="reset">Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12" height="400px">
            <v-item-group>
              <v-row align="center" justify="center">
                <v-col v-for="(hour,index) in getHours" :key="index" cols="12" md="4">
                  <v-item v-slot:default="{ active, toggle }">
                    <v-card
                      :color="active ? 'teal darken-4' : 'teal darken-1'"
                      class="d-flex align-center"
                      height="71"
                      v-on="{click: [getTime, toggle]}"
                    >
                      <v-card-title class="white--text">{{ hour }}</v-card-title>
                      <v-scroll-y-transition>
                        <div
                          v-if="active"
                          class="display-1 flex-grow-1 text-center white--text"
                        >Picked</div>
                      </v-scroll-y-transition>
                    </v-card>
                  </v-item>
                </v-col>
              </v-row>
            </v-item-group>
          </v-card>

          <v-btn color="teal darken-4" class="white--text" @click="chooseTime">Continue</v-btn>

          <v-btn text @click="reset">Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" align="center" height="450px">
            <v-card-text>
              <div>Full Name</div>
              <p class="display-1 font-weight-thin text--primary">{{getFirstname + ' ' + getName }}</p>
              <p>Telephone</p>
              <div class="display-1 font-weight-thin text--primary">{{ getPhone }}</div>
              <p>Gender</p>
              <div class="display-1 font-weight-thin text--primary">{{ getGenre }}</div>

              <p>Day</p>
              <div class="display-1 font-weight-thin text--primary">{{ getJour }}</div>
              <p>Hour</p>
              <div class="display-1 font-weight-thin text--primary">{{ getHeure }}</div>
            </v-card-text>
          </v-card>

          <v-btn color="teal darken-4" class="white--text" @click="submitForm">Submit</v-btn>

          <v-btn text @click="reset">Cancel</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    e1: 0,
    lastname: "",
    firstname: "",
    date: new Date().toISOString().substr(0, 10),
    modal: false,
    genre: ["Homme", "Femme"],
    gender: "",
    time: "",
    telephone: null,
    success: false,
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

  computed: {
    ...mapGetters([
      "getHours",
      "getName",
      "getFirstname",
      "getPhone",
      "getGenre",
      "getJour",
      "getHeure"
    ])
  },

  methods: {
    ...mapMutations([
      "setName",
      "setFirstname",
      "setNumber",
      "setGenre",
      "setJour",
      "setTime",
      "toHours"
    ]),

    ...mapActions(["loadHours", "register"]),

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
      if (
        this.lastname &&
        this.firstname &&
        this.telephone &&
        this.gender &&
        this.date
      ) {
        if (
          new Date(this.date).getDate() === new Date().getDate() ||
          new Date(this.date).getTime() > new Date().getTime()
        ) {
          if (
            new Date(this.date).getDay() === 5 ||
            new Date(this.date).getDay() === 6
          ) {
            alert("Weekends reserved for emergency");
          } else {
            this.setName(this.lastname);
            this.setFirstname(this.firstname);
            this.setNumber(this.telephone);
            this.setGenre(this.gender);
            this.setJour(this.date);
            this.loadHours();
            this.e1 = 2;
          }
        } else {
          alert("Choosen time is past");
        }
      } else {
        alert(`All fields must be filled`);
      }
    },

    chooseTime() {
      if (this.time) {
        this.e1 = 3;
      }
    },

    getTime(event) {
      this.time = "";
      let item = event.target.innerText;
      if (item) {
        this.time = item;
        this.setTime(this.time);
      } else {
        this.el = 2;
      }
    },

    submitForm() {
      this.el = 1;
      this.register();

      this.success = true;
      setTimeout(() => {
        location.reload();
      }, 5000);
    },

    reset() {
      this.e1 = 1;
      this.firstname = "";
      this.lastname = "";
      this.telephone = "";
      this.time = "";
      this.gender = "";
    }
  }
};
</script>

<style lang='scss' scoped>
.container {
  margin-top: 6rem;

  @media (max-width: 800px) {
    margin-top: 3rem;
  }

  .titre {
    margin-bottom: 3rem;
  }

  .v-stepper {
    width: 70%;
    margin: 0 auto;

    .v-card {
      .v-item-group {
        .v-row {
          .col {
            .v-card {
              .v-card__title {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
}
</style>