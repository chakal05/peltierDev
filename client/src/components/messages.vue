<template>
  <v-container>
    <div class="text-center">
      <h2 class="display-2 font-weight-thin mb-4">Messages</h2>
    </div>
    <v-row no-gutters>
      <v-col cols="12" md="4">
        <v-card height="700">
          <v-toolbar color="teal darken-4" dark>
            <v-toolbar-title>Inbox</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>

          <v-list two-line>
            <v-list-item-group v-model="selected" multiple active-class="teal--text">
              <template v-for="(item, index) in items">
                <v-list-item :key="item._id">
                  <template v-slot:default="{  }">
                    <v-list-item-content @click="readMessage(item._id)">
                      <v-list-item-title v-text="item.senderName"></v-list-item-title>
                      <v-list-item-subtitle v-text="item.message"></v-list-item-subtitle>
                      <br />
                      <v-list-item-subtitle v-text="item.time"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-list-item>

                <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
              </template>
            </v-list-item-group>
          </v-list>
          <div class="text-center">
            <v-pagination v-model="page" :length="6" color="teal darken-4"></v-pagination>
          </div>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="chat_box" height="700">
          <v-toolbar>
            <v-spacer></v-spacer>
            <v-toolbar-title>Inbox</v-toolbar-title>
          </v-toolbar>
          <v-list disabled>
            <v-list-item-group class="sender">
              <v-list-item v-for="(message, i) in receivedMessages" :key="i">
                <v-list-item-content>
                  <v-list-item-title v-text="message.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item-group class="user" align="right">
              <v-list-item v-for="(message, i) in sentMessages" :key="i">
                <v-list-item-content>
                  <v-list-item-title v-text="message.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <div class="reponse">
            <v-textarea color='teal darken-4'  class="mx-2 grey lighten-5" label="Message"  auto-grow rows="1"></v-textarea>
         <v-icon>comment</v-icon>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    selected: [],
    personel: [],
    user_to: null,
    message: null,
    page: 1,
    receivedMessages: [
      { text: "Hey, how is it going" },
      { text: "Let me come back to you" }
    ],
    sentMessages: [
      { text: "Hi, i got some answers for you" },
      { text: "Great, lets meet" }
    ],
    items: []
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
          this.items = response.data;

          this.items.map(element => {
            if (element.userToRead === "no") {
              this.selected.push(this.items.indexOf(element));
            }
          });
        })
        .catch(err => {
          throw err;
        });
    },

    readMessage(id) {
      this.$router.push({ name: "readMessage", params: { id: id } });
    },

    async getContacts() {
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

    async save() {
      let date = new Date().toISOString().substring(0, 10);
      let hour = new Date().getHours();
      let minute = new Date().getMinutes();
      let timestamp = `${date} at ${hour}:${minute}`;
      await axios
        .post("/messages", {
          name: localStorage.getItem("tokenUserName"),
          to: this.user_to,
          from: localStorage.getItem("tokenUserId"),
          time: timestamp,
          headline: this.headline,
          message: this.message,
          user_to_read: 0 // 0 or 1
        })
        .then(response => {
          if (response.status === 200) {
            this.user_to = null;
            this.message = null;
          }
        })
        .catch(err => {
          throw err;
        });
    }
  }
};
</script>

<style lang='scss'>
.container {
  .text-center {
    margin-bottom: 2rem;
  }
  .row {
    .v-card {
      position: relative;
      .v-pagination {
        position: absolute;
        bottom: 0.5rem;
        left: -0.1rem;
      }
    }
  }
  .chat_box {
    .sender {
      margin: 0.3rem;
      .v-list-item {
        width: 51%;
        background-color: grey;
        margin: 0.3rem;
        border-radius: 10px 4px 10px 5px;
      }
    }

    .user {
      margin: 0.3rem;
      .v-list-item {
        width: 51%;
        background-color: red;
        margin: 0.3rem;
        border-radius: 10px 4px 10px 5px;
      }
    }

    .reponse {
      position: absolute;
      bottom: 0;
      width: 100%;
      // background-color: rgb(0, 114, 114);
      //  padding: 1rem;

      .mx-2 {
        padding-top: 1rem;
        padding-left: 0.5rem;
      }
    }
  }
}
</style>