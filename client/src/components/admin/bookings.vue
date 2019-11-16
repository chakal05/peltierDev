<template>
  <v-container>
    <div class="calendarView" v-if="showCalendar">
      <v-row align="center" justify="center">
        <v-col>
          <div class="text-center">
            <h1 class="display-2 font-weight-thin mb-4">Consultations</h1>
          </div>

          <v-date-picker
            color="teal darken-4"
            v-model="picker"
            full-width
            :landscape="$vuetify.breakpoint.smAndUp"
            class="mt-4"
          ></v-date-picker>
          <v-col class="text-center" cols="12">
            <v-btn color="teal darken-4" class="white--text mr-4" @click="loadBookings">Retrouver</v-btn>
          </v-col>
        </v-col>
      </v-row>
    </div>

    <div class="table" v-if="showTable">
      <div class="text-center titre">
        <h1 class="display-2 font-weight-thin mb-4">Consultations</h1>
      </div>

      <v-data-table
        :headers="headers"
        :items="bookings"
        :search="search"
        :sort-by="['rank']"
        class="elevation-1"
        :items-per-page="fifteen"
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
            <v-spacer></v-spacer>
            <v-dialog persistent v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="teal darken-4" dark class="mb-2" v-on="on">Add new</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.nom" label="Nom" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select :items="genre" v-model="editedItem.genre" label="Genre" required></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.téléphone"
                          :counter="8"
                          label="Téléphone"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="getHours"
                          v-model="editedItem.heure"
                          label="Heure"
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="picker" readonly label="Le jour" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          v-model="editedItem.docteur"
                          :items="docteur"
                          label="Docteur"
                          required
                        ></v-select>
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
          <h2>0 appointment found</h2>
        </template>
      </v-data-table>
      <v-col class="text-center boutonBox" cols="12">
        <v-btn color="teal darken-4" class="white--text mr-4" @click="backToCalendar">Retourner</v-btn>
      </v-col>
    </div>
  </v-container>
</template>

<script>
//TODO Make sure no field is sent empty

import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from "axios";

export default {
  data: () => ({
    dialog: false,
    picker: new Date().toISOString().substr(0, 10),
    menu: false,
    showTable: false,
    showCalendar: true,
    error: "",
    search: "",
    zero: false,
    fifteen: 15,
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
      { text: "Docteur", value: "docteur" },
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
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],

    editedIndex: -1,
    editedItem: {
      nom: "",
      genre: "",
      heure: "",
      téléphone: "",
      docteur: ""
    },
    defaultItem: {
      nom: "",
      genre: "",
      heure: "",
      téléphone: "",
      docteur: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New item" : "Edit item";
    },
    ...mapGetters(["getHours", "ifSuccess", "ifError"])
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
        this.add();
      }
    },

    handleErrors() {},

    async loadBookings() {
      this.showCalendar = false;
      let bookings = await axios
        .get("/reservations", {
          params: {
            date: this.picker
          }
        })
        .catch(e => {
          if (e) {
            this.bookings = [];
            this.setJour(this.picker);
            this.loadHours();
            this.showTable = true;
          }
        });
      if (bookings && bookings.status === 200) {
        this.bookings = bookings.data;
        this.showTable = true;
        this.setJour(this.picker);
        this.loadHours();
      }
    },

    edit() {
      this.setId(this.editedItem._id);
      this.setName(this.editedItem.nom);
      this.setNumber(this.editedItem.téléphone);
      this.setGenre(this.editedItem.genre);
      this.setTime(this.editedItem.heure);
      this.setJour(this.picker);
      this.setdocteur(this.editedItem.docteur);
      this.changeItem();
      this.loadHours();
      this.close();

      if (this.ifSuccess) {
        this.close();
      } else if (this.ifError) {
        this.handleErrors();
      }
    },

    add() {
      if (
        this.editedItem.nom &&
        this.editedItem.téléphone &&
        this.editedItem.genre &&
        this.editedItem.heure &&
        this.picker &&
        this.editedItem.heure
      ) {
        if (
          new Date(this.picker).getDate() === new Date().getDate() ||
          new Date(this.picker).getTime() > new Date().getTime()
        ) {
          if (
            new Date(this.picker).getDay() === 5 ||
            new Date(this.picker).getDay() === 6
          ) {
            alert("Pas de consultation pendant les weekends");
          } else {
            this.setName(this.editedItem.nom);
            this.setNumber(this.editedItem.téléphone);
            this.setGenre(this.editedItem.genre);
            this.setTime(this.editedItem.heure);
            this.setJour(this.picker);
            this.setdocteur(this.editedItem.docteur);
            this.register();
            this.loadHours();
            this.close();

            if (this.ifSuccess) {
              this.loadBookings();
              alert(`Succesfully inserted a new appointment`);
            } else if (this.ifError) {
              alert("there was an error");
            }
          }
        } else {
          alert("La date choissie est passee");
        }
      } else {
        alert("All fields must be filled");
      }
    },

    delItem() {
      this.setId(this.indexToDel._id);
      this.SupprItem();
    },

    ...mapMutations([
      "setJour",
      "setName",
      "setFirstname",
      "setNumber",
      "setGenre",
      "setEmail",
      "setJour",
      "setTime",
      "setdocteur",
      "setId",
      "register",
      "changeItem",
      "SupprItem"
    ]),
    ...mapActions(["loadHours"]),

    showForm() {
      if (this.picker) {
        if (
          new Date(this.picker).getDate() === new Date().getDate() ||
          new Date(this.picker).getTime() > new Date().getTime()
        ) {
          if (
            new Date(this.picker).getDay() === 5 ||
            new Date(this.picker).getDay() === 6
          ) {
            alert("Pas de consultation pendant les weekends");
          } else {
            this.showFormulaire = true;
            this.showTable = false;
            this.notFound = false;
            this.showCalendar = false;
            this.getBookings();
          }
        } else {
          alert("La date choissie est passee");
        }
      }
    },

    backToCalendar() {
      this.showCalendar = true;
      this.showTable = false;
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
      width: 70%;
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