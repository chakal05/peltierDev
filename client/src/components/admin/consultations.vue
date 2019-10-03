<template>
  <v-container>
    <div class="up" v-if="getCalendar">
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
        <v-btn color="teal darken-4" class="white--text mr-4" @click="getDate">Retrouver</v-btn>
      </v-col>
    </div>

    <div v-if="getTable">
      <v-data-table
        :headers="headers"
        :items="getBooked"
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
                        <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
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
// todo add setter for getBooked
// todo ascending order for booked times
// todo handle 404 message when response returns empty

import { mapMutations, mapGetters } from "vuex";
export default {
  data: () => ({
    dialog: false,
    picker: new Date().toISOString().substr(0, 10),
    table: false,
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
    editedIndex: -1,
    editedItem: {
      nom: "",
      genre: 0,
      heure: 0,
      téléphone: 0
    },
    defaultItem: {
      nom: "",
      genre: 0,
      heure: 0,
      téléphone: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },

    ...mapGetters(["getBooked", "getTable", "getCalendar"])
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
      this.getBooked = [];
    },

    editItem(item) {
      this.editedIndex = this.getBooked.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.getBooked.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.getBooked.splice(index, 1);
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
        Object.assign(this.getBooked[this.editedIndex], this.editedItem);
      } else {
        this.getBooked.push(this.editedItem);
      }
      this.close();
    },

    ...mapMutations(["fetchDate", "retourner"]),

    getDate() {
      if (this.picker) {
        this.fetchDate(this.picker);
      }
    }
  }
};
</script>
<style>
</style>