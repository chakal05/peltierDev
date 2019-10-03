<template>
  <v-container>
    <div class="up" v-if="showCalendar">
      <div class="text-center titre">
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

      <v-col class="text-center boutonBox" cols="12">
        <v-btn color="teal darken-4" class="white--text mr-4" @click="loadBookings">Retrouver</v-btn>
      </v-col>
    </div>

    <div v-if="showTable">
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
                <v-btn color="teal darken-4" dark class="mb-2" v-on="on">New Item</v-btn>
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
                        <v-text-field v-model="editedItem.téléphone" label="Téléphone"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.heure" label="Heure"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
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
        <v-btn color="teal darken-4" class="white--text mr-4" @click="retourner">Retrouver</v-btn>
      </v-col>
    </div>
  </v-container>
</template>

<script>
// todo add and delete new item to and from
// todo ascending order for booked times
// todo handle 404 message when response returns empty

import axios from "axios";
export default {
  data: () => ({
    dialog: false,
    picker: new Date().toISOString().substr(0, 10),
    showTable: false,
    showCalendar: true,
    search: "",
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
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
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
      confirm("Are you sure you want to delete this item?") &&
        this.bookings.splice(index, 1);
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
      }
      this.close();
    },

    async loadBookings() {
      let bookings = await axios
        .post("/reservations", { date: this.picker })
        .catch(e => alert(e));

      if (bookings && bookings.status === 200) {
        this.bookings = bookings.data;
        this.showTable = true;
        this.showCalendar = false;
      }
    },

    async edit() {
      let edited = await axios
        .put("/reservations", {
          item: this.editedItem
        })
        .catch(e => alert(e));
    },

    retourner() {
      this.showTable = false;
      this.showCalendar = true;
    }
  }
};
</script>
<style>
</style>