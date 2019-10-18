<template>
  <v-container>
    <div class="calendarView" v-if="showCalendar">
      <v-row align="center" justify="center">
        <v-col>
          <div class="text-center">
            <h1 class="display-2 font-weight-thin mb-4">Retrouver</h1>
          </div>

          <v-date-picker
            color="teal darken-4"
            v-model="picker"
            locale="fr-fr"
            full-width
            :landscape="$vuetify.breakpoint.smAndUp"
            class="mt-4"
          ></v-date-picker>
          <v-col class="text-center" cols="12">
            <v-btn color="teal darken-4" class="white--text mr-4" @click="loadBookings">Retrouver</v-btn>
          </v-col>
        </v-col>
        <v-col>
          <div class="text-center">
            <h1 class="display-2 font-weight-thin mb-4">Ajouter</h1>
          </div>

          <v-date-picker
            color="teal darken-4"
            v-model="setter"
            locale="fr-fr"
            full-width
            :landscape="$vuetify.breakpoint.smAndUp"
            class="mt-4"
          ></v-date-picker>
          <v-col class="text-center" cols="12">
            <v-btn color="teal darken-4" class="white--text mr-4" @click="showForm">Ajouter</v-btn>
          </v-col>
        </v-col>
      </v-row>
    </div>

    <v-row v-if="showFormulaire">
      <v-col cols="12" class="text-center">
        <h1 class="display-2 font-weight-thin mb-4">Remplir le formulaire</h1>
      </v-col>
      <br />
      <v-row align="center" justify="center" class="elevation-5 formulaire">
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="firstname"
                  :rules="nameRules"
                  :counter="10"
                  label="Nom"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="lastname"
                  :rules="nameRules"
                  :counter="10"
                  label="Prenom"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="telephone"
                  :rules="telephoneRules"
                  label="Telephone"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="3">
                <v-select :items="genre" v-model="gender" label="Genre" required></v-select>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field v-model="setter" readonly label="Date" required></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-select v-model="tillgTimmar" :items="getHours" label="Heure" required></v-select>
              </v-col>
              <v-col cols="12" md="3">
                <v-select v-model="doc" :items="docteur" label="Docteur" required></v-select>
              </v-col>
            </v-row>
            <v-col class="text-center" cols="12">
              <v-btn color="error" @click="backToCalendar">Retourner</v-btn>

              <v-btn color="teal darken-4" class="white--text" @click="save">Ajouter</v-btn>
            </v-col>
          </v-container>
        </v-form>
      </v-row>
    </v-row>

    <v-row align="center" justify="center" class="notFound" v-if="notFound">
      <v-col cols="12" md="6">
        <v-card class="d-flex align-center" height="400">
          <v-card-text class="flex-grow-1 text-center">
            <v-icon color="teal darken-4">fas fa-exclamation-circle</v-icon>
            <h3 class="display-2 font-weight-thin">Rien à afficher</h3>
            <p>Pour la date suivante : {{picker}}</p>
            <v-btn color="error" @click="backToCalendar">Retourner</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <div class="table" v-if="showTable">
      <div class="text-center titre">
        <h1 class="display-2 font-weight-thin mb-4">Consultations</h1>
      </div>

      <v-data-table
        :headers="headers"
        :items="bookings"
        :search="search"
        sort-by="nom"
        class="elevation-1"
        locale="fr-FR"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Rechercher"
              single-line
              hide-details
            ></v-text-field>
            <br />
            <div class="flex-grow-1"></div>
            <v-dialog persistent v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.nom" label="Nom"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.genre" label="Genre"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.téléphone" :counter="8" label="Téléphone"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select :items="getHours" v-model="editedItem.heure" label="Heure"></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="picker" readonly label="La date"></v-text-field>
                      </v-col>
                         <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.docteur" readonly label="La date"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn color="error" @click="close">Annuler</v-btn>
                  <v-btn color="teal darken-4" class="white--text" @click="save">Enregistrer</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
          <v-icon small @click="deleteItem(item)">delete</v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="teal darken-4" class="white--text" @click="initialize">RESET</v-btn>
        </template>
      </v-data-table>
      <v-col class="text-center boutonBox" cols="12">
        <v-btn color="teal darken-4" class="white--text mr-4" @click="backToCalendar">Retourner</v-btn>
      </v-col>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from "axios";

export default {
  data: () => ({
    dialog: false,
    setter: new Date().toISOString().substr(0, 10),
    picker: new Date().toISOString().substr(0, 10),
    notFound: false,
    showTable: false,
    showFormulaire: false,
    showCalendar: true,
    error: "",
    value: "",
    search: "",
    gender: "",
    docteur: [
      "Dr Omar Hassan Houssein",
      "Dr Hodan Farah Nour",
      "Dr Moussa Moussa Ali"
    ],
    indexToDel: null,
    genre: [`Homme`, `Femme`],
    headers: [
      {
        text: "Nom",
        align: "left",
        sortable: false,
        value: "nom"
      },
      { text: "Genre", value: "genre" },
      { text: "Téléphone", value: "téléphone" },
      { text: "Heure", value: "heure" },
      { text: "Docteur", value: "doc" },
      { text: "Actions", value: "action", sortable: false }
    ],
    bookings: [],
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
    ],
    valid: "",
    firstname: "",
    lastname: "",
    doc: "",
    tillgTimmar: "",
    telephone: "",
    editedIndex: -1,
    editedItem: {
      nom: "",
      genre: "",
      heure: "",
      téléphone: "",
      doc: ""
    },
    defaultItem: {
      nom: "",
      genre: "",
      heure: "",
      téléphone: "",
      doc: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Ajouter" : "Changer";
    },
    ...mapGetters(["getHours"])
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.bookings = [];
    },

    editItem(item) {
      this.editedIndex = this.bookings.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.bookings.indexOf(item);
      this.indexToDel = this.bookings[index];

      confirm("Are you sure you want to delete this item?") &&
        this.bookings.splice(index, 1);
      this.delItem();
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.bookings[this.editedIndex], this.editedItem);
        this.edit();
      } else {
        this.bookings.push(this.editedItem);
        this.addItem();
      }
      this.close();
    },

    handleErrors() {
      this.notFound = true;
      this.showTable = false;
      this.showCalendar = false;
    },

    async loadBookings() {
      let bookings = await axios
        .get("/reservations", {
          params: {
            date: this.picker
          }
        })
        .catch(e => {
          this.handleErrors();
        });

      if (bookings && bookings.status === 200) {
      
        this.bookings = bookings.data;
        this.showTable = true;
        this.showCalendar = false;
        this.notFound = false;
        this.setJour(this.picker);
        this.loadHours();
      }
    },

    async addItem() {
      let toAdd = await axios
        .post("/register", {
          nom: this.lastname,
          prenom: this.firstname,
          genre: this.gender,
          telephone: this.telephone,
          time: this.tillgTimmar,
          date: this.setter,
          docteur: this.doc
        })
        .catch(e => alert(e));
    },

    async edit() {
      this.editItem.heure = this.value;
      let edited = await axios
        .put("/reservations", {
          id: this.editedItem._id,
          nom: this.editedItem.nom,
          genre: this.editedItem.genre,
          telephone: this.editedItem.téléphone,
          heure: this.editedItem.heure
        })
        .catch(e => alert(e));
    },

    async delItem() {
      let toDelItem = await axios
        .post("/reservations", {
          item: this.indexToDel._id
        })
        .catch(e => alert(e));
    },

    ...mapMutations(["setJour"]),
    ...mapActions(["loadHours"]),

    async showForm() {
      if (this.setter) {
        if (
          new Date(this.setter).getDate() === new Date().getDate() ||
          new Date(this.setter).getTime() > new Date().getTime()
        ) {
          if (
            new Date(this.setter).getDay() === 5 ||
            new Date(this.setter).getDay() === 6
          ) {
            alert("Pas de consultation pendant les weekends");
          } else {
            this.showFormulaire = true;
            this.showTable = false;
            this.notFound = false;
            this.showCalendar = false;

            let bookings = await axios
              .get("/reservations", {
                params: {
                  date: this.setter
                }
              })
              .catch(e => {
                // this.handleErrors();
              });

            if (bookings && bookings.status) {
              this.setJour(this.setter);
              this.loadHours();
            }
          }
        } else {
          alert("La date choissie est passee");
        }
      }
    },
    backToCalendar() {
      this.showTable = false;
      this.notFound = false;
      this.showCalendar = true;
      this.showFormulaire = false;
    }
  }
};
</script>
<style lang='scss' scoped>
.container {
  .calendarView {
    .text-center {
      margin-bottom: 2rem;

      .v-btn {
        margin-top: 1rem;
      }
    }
    .row {
      width: 90%;
      margin: auto;
      margin-bottom: 3rem;
    }
  }

  .table {
    .v-data-table {
      margin-bottom: 1rem;
    }
  }

  .formulaire {
    max-width: 90%;
    margin: auto;
    background-color: #ffffff;

    .v-btn {
      margin: 1rem;
    }
  }
  .notFound {
    .v-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }
  }
}
</style>