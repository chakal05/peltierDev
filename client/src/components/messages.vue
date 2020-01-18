<template>
  <v-data-table
    :headers="headers"
    :items="listOfMessages"
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
        <v-dialog v-model="dialog" persistent max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="teal darken-4" dark class="mb-2" v-on="on" @click="editItem">New Message</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">New message</span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="12">
                  <v-select
                    :items="personel"
                    item-text="name"
                    item-value="_id"
                    outlined
                    v-model="user_to"
                    label="To"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="12">
                  <v-textarea
                    outlined
                    name="input-7-4"
                    v-model="message"
                    height="200"
                    label="Message"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Send</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
      <v-icon small @click="deleteItem(item)">delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
import socket from 'socket.io-client';
export default {
  data: () => ({
    dialog: false,
    search: "",
    personel: [],
    user_to: null,
    message: null,
    listOfMessages: [],
    headers: [
      {
        text: "Messages",
        align: "left",
        sortable: false,
        value: "message"
      },
      { text: "From", value: "senderName" },
      { text: "Date", value: "time" },
      { text: "Status", value: "userToRead" },
      { text: "Actions", value: "action", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      message: "",
      from: String,
      time: String,
      status: 0
    },
    defaultItem: {
      message: "",
      from: String,
      time: String,
      status: 0
    },

    socket: socket('localhost:5000')
  }),
  computed: {
    //
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
     this.loadMessages();
  },
  methods: {
    // Get messages
     async loadMessages() {
    await axios
      .get("/messages", {
        params: {
          id: localStorage.getItem("tokenUserId"),
          data: "messages"
        }
      })
      .then(response => {
        this.listOfMessages = response.data;
      })
      .catch(err => {
        throw err;
      });
  },
    async editItem() {
      await axios
        .get("/personel", {
          params: {
            id: localStorage.getItem("tokenUserId"),
            data: "personel"
          }
        })
        .then(response => {
          //this.personel = response.data;
console.log(response.data);
        })
        .catch(err => {
          throw err;
        });
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
    async save() {
      let date = new Date().toISOString().substring(0, 10);
      let hour = new Date().getHours();
      let minute = new Date().getMinutes();
      let timestamp = `${date} at ${hour}:${minute}`;
      // Object.assign(this.desserts[this.editedIndex], this.editedItem);
      await axios
        .post("/messages", {
          name: localStorage.getItem('tokenUserName'),
          to: this.user_to,
          from: localStorage.getItem("tokenUserId"),
          time: timestamp,
          message: this.message,
          user_to_read: "no"
        })
        .then(response => {
          if(response.status === 200){
            this.user_to = null;
            this.message = null;
          }
        })
        .catch(err => {
          throw err;
        });
      this.close();
    }
  }
};
</script>

<style>
</style>