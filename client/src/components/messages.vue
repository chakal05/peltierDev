<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :search="search"
    sort-by="carbs"
    class="elevation-1"
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
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="teal darken-4" dark class="mb-2" v-on="on" @click="editItem">New Message</v-btn>
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
                  <v-col cols="12" sm="6" md="4"></v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
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
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    dialog: false,
    search: "",
    headers: [
      {
        text: "Messages",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "From", value: "calories" },
      { text: "Date", value: "fat" },
      { text: "Status", value: "carbs" },
      { text: "Actions", value: "action", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: String,
      fat: String,
      carbs: 0
    },
    defaultItem: {
      name: "",
      calories: String,
      fat: String,
      carbs: 0
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
    this.loadMessages();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          name: "loremipsum sd kds;ooe sdfdfksd sdksdksd fjdfdfjwwewe dfjd",
          calories: "jean Alain",
          fat: "2018-3-04",
          carbs: 0
        },
        {
          name: "loremipsum sd kds;ooe sdfdfksd sdksdksd fjdfdfjwwewe dfjd",
          calories: "jean Alain",
          fat: "2018-3-04",
          carbs: 1
        },
        {
          name: "loremipsum sd kds;ooe sdfdfksd sdksdksd fjdfdfjwwewe dfjd",
          calories: "jean Alain",
          fat: "2018-3-04",
          carbs: 0
        },
        {
          name: "loremipsum sd kds;ooe sdfdfksd sdksdksd fjdfdfjwwewe dfjd",
          calories: "jean Alain",
          fat: "2018-3-04",
          carbs: 1
        },
        {
          name: "loremipsum sd kds;ooe sdfdfksd sdksdksd fjdfdfjwwewe dfjd",
          calories: "jean Alain",
          fat: "2018-3-04",
          carbs: "Read"
        },
        {
          name: "loremipsum sd kds;ooe sdfdfksd sdksdksd fjdfdfjwwewe dfjd",
          calories: "jean Alain",
          fat: "2018-3-04",
          carbs: "Read"
        },
        {
          name: "loremipsum sd kds;ooe sdfdfksd sdksdksd fjdfdfjwwewe dfjd",
          calories: "jean Alain",
          fat: "2018-3-04",
          carbs: "Read"
        },
        {
          name: "loremipsum sd kds;ooe sdfdfksd sdksdksd fjdfdfjwwewe dfjd",
          calories: "jean Alain",
          fat: "2018-3-04",
          carbs: "Read"
        },
        {
          name: "loremipsum sd kds;ooe sdfdfksd sdksdksd fjdfdfjwwewe dfjd",
          calories: "jean Alain",
          fat: "2018-3-04",
          carbs: "Read"
        },
        {
          name: "loremipsum sd kds;ooe sdfdfksd sdksdksd fjdfdfjwwewe dfjd",
          calories: "jean Alain",
          fat: "2018-3-04",
          carbs: "Read"
        }
      ];
    },
    getColor(carbs) {
      if (carbs === 0) return "red";
      else if (carbs > 0) return "orange";
      else return "green";
    },

    // Get messages

    async loadMessages() {
      let response = await axios
        .get("/messages", {
          params: {
            id: localStorage.getItem("tokenUserId")
          }
        })
        .catch(e => alert(e));
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
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
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style></style>
