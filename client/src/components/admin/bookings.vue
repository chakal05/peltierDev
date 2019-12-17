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
            <v-btn color="teal darken-4" class="white--text mr-4" @click="load">SEARCH</v-btn>
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
        :items="getAppointments"
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
                <v-btn color="teal darken-4" dark class="mb-2" v-on="on" @click="editItem">Add new</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.nom"
                          label="Name"
                          :rules="nameRules"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select :items="genre" v-model="editedItem.genre" label="Gender" required></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.téléphone"
                          :counter="8"
                          label="Telephone"
                          :rules="telephoneRules"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="getHours"
                          v-model="editedItem.heure"
                          label="Time"
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="picker" readonly label="Day" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          v-model="editedItem.docteur"
                          :items="docteur"
                          label="Doctor"
                          required
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <div class="flex-grow-1"></div>
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
          <h2>0 appointment found</h2>
        </template>
      </v-data-table>
      <v-col class="text-center boutonBox" cols="12">
        <v-btn color="teal darken-4" class="white--text mr-4" @click="backToCalendar">Previous</v-btn>
      </v-col>
    </div>
  </v-container>
</template>

<script>
//TODO  'npm config set ignore-scripts false' was run. Make sure everything
// TODO run smoothly at the end

import { mapGetters, mapMutations, mapActions } from "vuex";

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
    genre: [`Man`, `Woman`],
    bookings: [],
    headers: [
      {
        text: "Name",
        align: "left",
        sortable: false,
        value: "nom"
      },
      { text: "Gender", value: "genre" },
      { text: "Telephone", value: "téléphone" },
      { text: "Time", value: "heure" },
      { text: "Doctor", value: "docteur" },
      { text: "Actions", value: "action", sortable: false }
    ],
    nameRules: [
      v => !!v || "Le nom est requis",
      v => isNaN(v) || "Names should not contain numbers"
    ],
    telephoneRules: [
      v => !!v || "A phone number is required ",
      v => (v && v.length <= 8) || "Phone number should contain 8 numbers max",
      v => !isNaN(v) || "The phone number should only contain numeric values"
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
    ...mapGetters(["getAppointments", "getHours", "ifSuccess", "ifError"])
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.getAppointments.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.loadHours(this.picker);
    },

    deleteItem(item) {
      const index = this.getAppointments.indexOf(item);
      this.indexToDel = this.getAppointments[index];

      confirm("Are you sure you want to delete this item?") &&
        this.setId(this.indexToDel._id);
      this.SupprItem();
      this.getAppointments.splice(index, 1);
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
        this.edit();
      } else {
        this.add();
      }
    },

    load() {
      this.showCalendar = false;
      this.loadBookings([this.picker, "admin"]);
      this.showTable = true;
    },

    edit() {
      if (this.editedItem.heure === "Fully booked") {
        alert("We are fully booked for this day, please choose another day");
      } else {
        Object.assign(this.getAppointments[this.editedIndex], this.editedItem);
        this.setId(this.editedItem._id);
        this.setName(this.editedItem.nom);
        this.setNumber(this.editedItem.téléphone);
        this.setGenre(this.editedItem.genre);
        this.setTime(this.editedItem.heure);
        this.setJour(this.picker);
        this.setdocteur(this.editedItem.docteur);
        this.changeItem();
        this.close();

        if (this.ifSuccess) {
          this.close();
        } else if (this.ifError) {
          this.close();
        }
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
            alert("Weekends reserved for emergency");
            this.close();
          } else if (this.editedItem.heure === "Fully booked") {
            alert(
              "We are fully booked for this day, please choose another day"
            );
          } else {
            this.getAppointments.push(this.editedItem);
            this.setName(this.editedItem.nom);
            this.setNumber(this.editedItem.téléphone);
            this.setGenre(this.editedItem.genre);
            this.setTime(this.editedItem.heure);
            this.setJour(this.picker);
            this.setdocteur(this.editedItem.docteur);
            this.register();
            this.close();
            if (this.ifSuccess) {
              alert(`Succesfully inserted a new appointment`);
              this.close();
            } else if (this.ifError) {
              alert("there was an error");
              this.close();
            }
          }
        } else {
          alert("Choosen time is past");
          this.close();
        }
      } else {
        alert("All fields must be filled");
      }
    },

    ...mapMutations([
      "setJour",
      "setName",
      "setFirstname",
      "setNumber",
      "setGenre",
      "setJour",
      "setTime",
      "setdocteur",
      "setId"
    ]),
    ...mapActions([
      "loadBookings",
      "loadHours",
      "register",
      "changeItem",
      "SupprItem"
    ]),

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