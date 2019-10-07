<template>
  <v-container>
    <div class="calendarView" v-if="showCalendar">
      <div class="text-center">
        <h1 class="display-2 font-weight-thin mb-4">Entrez une date</h1>
      </div>

      <v-row align="center" justify="center">
        <v-date-picker
          color="teal darken-4"
          v-model="picker"
          locale="fr-fr"
          full-width
          :landscape="$vuetify.breakpoint.smAndUp"
          class="mt-4"
        ></v-date-picker>
      </v-row>

      <v-col class="text-center" cols="12">
        <v-btn color="teal darken-4" class="white--text mr-4" @click="loadBookings">Retrouver</v-btn>
      </v-col>
    </div>

    <div class="notFound" v-if="notFound">
      <v-card max-width="344" class="mx-auto">
        <v-card-title>Aucune consultation</v-card-title>
        <v-card-text>Pour la date suivante: {{picker}}</v-card-text>
        <v-card-actions>
          <v-col class="btnBox" cols="12">
            <v-btn color="teal darken-4" class="white--text" @click="backToCalendar">Retourner</v-btn>
            <v-btn color="light ">Créer</v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </div>

    <div class="table" v-if="showTable">
      <div class="text-center titre">
        <h1 class="display-2 font-weight-thin mb-4">Consultations</h1>
      </div>

      <v-data-table
        :headers="headers"
        :items="bookings"
        sort-by="nom"
        class="elevation-1"
        locale="fr-FR"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>

            <div class="flex-grow-1"></div>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="teal darken-4" dark class="mb-2" v-on="on">Ajouter</v-btn>
              </template>
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
                        <v-select :items="getHours"  v-model="editedItem.heure" label="Heure"></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="picker" readonly label="La date"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn color="teal darken-4" text @click="close">Annuler</v-btn>
                  <v-btn color="teal darken-4" text @click="save">Enregistrer</v-btn>
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
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
      <v-col class="text-center boutonBox" cols="12">
        <v-btn color="teal darken-4" class="white--text mr-4" @click="backToCalendar">Retourner</v-btn>
      </v-col>
    </div>
  </v-container>
</template>

<script>
// todo ## find a way to bind editedItem.heure and value of getHours
// todo ## ascending order for booked times
// todo ## if there is no consultation, the add btn should bring on
// todo ## a new component

import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from "axios";

export default {
  data: () => ({
    dialog: false,
    dialog2: false,
    picker: new Date().toISOString().substr(0, 10),
    notFound: false,
    showTable: false,
    showCalendar: true,
    value: "",
    search: "",
    indexToDel: null,
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
      { text: "Actions", value: "action", sortable: false }
    ],
    bookings: [],
    editedIndex: -1,
    editedItem: {
      nom: "",
      genre: "",
      heure: "",
      téléphone: ""
    },
    defaultItem: {
      nom: "",
      genre: "",
      heure: "",
      téléphone: ""
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
    },
    dialog2(val) {
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
      this.dialog2 = false;
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
          nom: this.editedItem.nom,
          genre: this.editedItem.genre,
          telephone: this.editedItem.téléphone,
          heure: this.value,
          date: this.picker
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
          heure: this.value
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

    backToCalendar() {
      this.showTable = false;
      this.notFound = false;
      this.showCalendar = true;
    }
  }
};
</script>
<style lang='scss' scoped>
.container {
  .calendarView {
    margin-top: -5rem;

    .text-center {
      margin-bottom: 2rem;
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
}
</style>