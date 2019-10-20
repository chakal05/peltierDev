<template>
  <v-container>
      <div class="text-center">
          <h2 class="display-2 font-weight-thin mb-4">Doctors list</h2>
      </div>
      <br>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      sort-by="name"
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
                      <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.departement" label="Departement"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.telephone" label="Telephone"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.username" label="Username"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field type='password' v-model="editedItem.password" label="Password"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="teal darken-4" text @click="close">Cancel</v-btn>
                <v-btn color="teal darken-4" text @click="save">Save</v-btn>
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
    <br>
    <v-col class="text-center" cols="12">
      <v-btn color="teal darken-4" class="white--text mr-4" @click="loadBookings">Retrouver</v-btn>
    </v-col>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    search: "",
    headers: [
      {
        text: "Name",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Departement", value: "departement" },
      { text: "Telephone", value: "telephone" },
      { text: "Username", value: "username" },
      { text: "Password", value: "password" },
      { text: "Actions", value: "action", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      departement: 0,
      telephone: 0,
      username: 0,
      password: 0
    },
    defaultItem: {
      name: "",
      departement: 0,
      telephone: 0,
      username: 0,
      password: 0
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
      this.desserts = [
        {
          name: "Mohamed Salah Nour",
          departement: "Cardiology",
          telephone: 343433434,
          username: "med@ds",
          password: "sdds3sd"
        },
        {
          name: "Fozia Farah Fouad",
          departement: "Pharmacy",
          telephone: 63323233,
          username: "dsd-ew",
          password: "ds443"
        },
        {
          name: "Jamal Mohamed Ahmed",
          departement: "Neurology",
          telephone: 62223322,
          username: "jam09-",
          password: "sdlp0"
        },
        {
          name: "Filsan Mohamed Guelleh",
          departement: "Radiology",
          telephone: 233333333,
          username: "lllds-03",
          password: "sdsd09"
        },
        {
          name: "Ali Ahmed Guedid",
          departement: "General medecine",
          telephone: 302232332,
          username: "sdv@d",
          password: "0-dss"
        },
        {
          name: "Habone Abdi Ahmed",
          departement: "Laboratory",
          telephone: 92722323,
          username: "ssdq",
          password: "23sdd"
        },
        {
          name: "Houda Nour Moumin",
          departement: "Cardiology",
          telephone: 6223232,
          username: "sjsd",
          password: "dsdkm-"
        },
        {
          name: "Farhan Mohamoud Fouad",
          departement: "Radiology",
          telephone: 22323233,
          username: "sdsd0e",
          password: "sdsdds032"
        },
        {
          name: "Yacin Hassan Abdourahman",
          departement: "Neurology",
          telephone: 11122121,
          username: "xxcs0",
          password: "90sd90"
        },
        {
          name: "Fatouma Ali Omar",
          departement: "Neurology",
          telephone: 9019281,
          username: "dsf099a",
          password: "sds000ds"
        }
      ];
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