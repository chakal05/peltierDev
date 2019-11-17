<template>
  <v-container>
    <div class="text-center">
      <h2 class="display-2 font-weight-thin mb-4">Doctors list</h2>
    </div>
    <br />
    <v-data-table
      :headers="headers"
      :items="getDoctorsList"
      :search="search"
      sort-by="name"
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
                      <v-text-field
                        v-model="editedItem.password"
                        :append-icon="show1 ? 'visibility' : 'visibility_off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        hint="At least x characters"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
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
      <template v-slot:no-data></template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data: () => ({
    dialog: false,
    fifteen: 15,
    search: "",
    indexToDel: null,
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
      // { text: "Password", value: "password" },
      { text: "Actions", value: "action", sortable: false }
    ],
    doctorsList: [],
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
    },
    show1: false,
    password: "Password",
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 3 || "Min 3 characters",
      emailMatch: () => "The email and password you entered don't match"
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters(["getDoctorsList", "success"])
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.loadDoctors();
    this.initialize();
  },

  methods: {
    initialize() {
      this.doctorsList = [];
    },

    editItem(item) {
      this.editedIndex = this.getDoctorsList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.getDoctorsList.indexOf(item);
      this.indexToDel = this.getDoctorsList[index];
      confirm("Are you sure you want to delete this item?") &&
        this.getDoctorsList.splice(index, 1);
      this.supprDoc();
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
        Object.assign(this.getDoctorsList[this.editedIndex], this.editedItem);
        this.edit();
      } else {
        this.getDoctorsList.push(this.editedItem);
        this.add();
      }
      this.close();
    },

    add() {
      if (
        this.editedItem.name &&
        this.editedItem.departement &&
        this.editedItem.telephone &&
        this.editedItem.username &&
        this.editedItem.password
      ) {
        this.setDoctorName(this.editedItem.name);
        this.setDepartement(this.editedItem.departement);
        this.setDoctorTelephone(this.editedItem.telephone);
        this.setDoctorUsername(this.editedItem.username);
        this.setDoctorPassword(this.editedItem.password);
        this.addDoctor();

        if (this.success) {
          // todo find a way to update component
          //this.$forceUpdate();
        }
      } else {
        alert(`All fields must be filled`);
      }
    },

    edit() {
      this.setDoctorId(this.editedItem._id);
      this.setDoctorName(this.editedItem.name);
      this.setDepartement(this.editedItem.departement);
      this.setDoctorTelephone(this.editedItem.telephone);
      this.setDoctorUsername(this.editedItem.username);
      this.setDoctorPassword(this.editedItem.password);
      this.editDoctor();
    },

    supprDoc() {
      this.setDoctorId(this.indexToDel);
      this.deleteDoctor();
    },

    ...mapMutations([
      "setDoctorName",
      "setDepartement",
      "setDoctorTelephone",
      "setDoctorUsername",
      "setDoctorPassword",
      "setDoctorId"
    ]),
    ...mapActions(["loadDoctors", "addDoctor", "editDoctor", "deleteDoctor"])
  }
};
</script>