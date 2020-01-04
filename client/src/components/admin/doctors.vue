<template>
  <v-container>
    <div class="text-center">
      <h2 class="display-2 font-weight-thin mb-4">Doctors list</h2>
    </div>
    <br />
    <v-data-table
      :headers="headers"
      :items="getPersonelList"
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
              <v-btn color="teal darken-4" dark class="mb-2" v-on="on">Add doctor</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field :rules="nameRules" v-model="editedItem.name" label="Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.departement" label="Departement"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        :rules="telephoneRules"
                        v-model="editedItem.telephone"
                        label="Telephone"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.adresse" label="Adresse"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.city " label="City"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.email" :rules="emailRules" label="Email"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="editedItem.birthdate"
                            label="Birthday date"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          ref="picker"
                          v-model="date"
                          :max="new Date().toISOString().substr(0, 10)"
                          min="1950-01-01"
                          @change="birth"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>

                      <v-col>
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
    date: null,
    menu: false,
    headers: [
      {
        text: "Name",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Departement", value: "departement" },
      { text: "Telephone", value: "telephone" },
      { text: "Email", value: "email" },
      { text: "Adresse", value: "adresse" },
      { text: "City", value: "city" },
      { text: "Birthdate", value: "birthdate" },
      { text: "Actions", value: "action", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      departement: "",
      telephone: "",
      adresse: "",
      city: "",
      email: "",
      birthdate: "",
      password: ""
    },
    defaultItem: {
      name: "",
      departement: "",
      telephone: "",
      adresse: "",
      city: "",
      email: "",
      birthdate: "",
      password: ""
    },
    show1: false,
    password: "Password",
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 3 || "Min 3 characters",
      emailMatch: () => "The email and password you entered don't match"
    },
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    nameRules: [
      v => !!v || "Le nom est requis",
      v => isNaN(v) || "Names should not contain numbers"
    ],
    telephoneRules: [
      v => !!v || "A phone number is required ",
      v => (v && v.length <= 8) || "Phone number should contain 8 numbers max",
      v => !isNaN(v) || "The phone number should only contain numeric values"
    ]
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters(["getPersonelList"])
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },

  created() {
    this.loadPersonel("doctor");
    this.initialize();
  },

  methods: {
    initialize() {
      this.getPersonelList = [];
    },

    editItem(item) {
      this.editedIndex = this.getPersonelList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.getPersonelList.indexOf(item);
      this.indexToDel = this.getPersonelList[index];
      confirm("Are you sure you want to delete this item?") &&
        this.getPersonelList.splice(index, 1);
      this.supprDoc();
    },

    birth(date) {
      this.$refs.menu.save(date);
      if(date) this.editedItem.birthdate = date;
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
        Object.assign(this.getPersonelList[this.editedIndex], this.editedItem);
        this.edit();
      } else {
        this.getPersonelList.push(this.editedItem);
        this.add();
      }
      this.close();
    },

    add() {
      if (
        this.editedItem.name &&
        this.editedItem.departement &&
        this.editedItem.telephone &&
        this.editedItem.password &&
        this.editedItem.adresse &&
        this.editedItem.city &&
        this.editedItem.birthdate &&
        this.editedItem.email
      ) {
        this.setPersonelName(this.editedItem.name);
        this.setPersonelEmail(this.editedItem.email);
        this.setPersonelAdresse(this.editedItem.adresse);
        this.setPersonelCity(this.editedItem.city);
        this.setPersonelBirth(this.date);
        this.setDepartement(this.editedItem.departement);
        this.setPersonelTelephone(this.editedItem.telephone);
       this.setPersonelPassword(this.editedItem.password);
        this.setPersonelProfil("doctor");
        this.addPersonel();

        if (this.success) {
          // todo find a way to update component
        }
      } else {
        alert(`All fields must be filled`);
      }
    },

    edit() {
      this.setPersonelId(this.editedItem._id);
      this.setPersonelName(this.editedItem.name);
      this.setPersonelEmail(this.editedItem.email);
      this.setPersonelAdresse(this.editedItem.adresse);
      this.setPersonelCity(this.editedItem.city);
      this.setPersonelBirth(this.editedItem.birthdate);
      this.setDepartement(this.editedItem.departement);
      this.setPersonelTelephone(this.editedItem.telephone);
     this.setPersonelPassword(this.editedItem.password);
      this.editPersonel();
    },

    supprDoc() {
      this.setPersonelId(this.indexToDel);
      this.deletePersonel();
    },

    ...mapMutations([
      "setPersonelName",
      "setDepartement",
      "setPersonelTelephone",
      "setPersonelPassword",
      "setPersonelId",
      "setPersonelProfil",
      "setPersonelEmail",
      "setPersonelAdresse",
      "setPersonelCity",
      "setPersonelBirth"
    ]),
    ...mapActions([
      "loadPersonel",
      "addPersonel",
      "editPersonel",
      "deletePersonel"
    ])
  }
};
</script>