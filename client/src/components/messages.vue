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
                    <v-list-item-content @click="messageDetails(item._id)">
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
        <div class="chat">
          <div class="chat-header clearfix">
            <div class="chat-about">
              <div class="chat-with">{{conversationWith}}</div>
            </div>
          </div>
          <!-- end chat-header -->

          <div class="chat-history">
            <v-list disabled class="clearfix">
              <v-list-item-group>
                <v-list-item v-for="(message, i) in receivedMessages" :key="i">
                  <v-list-item-content>
                    <v-list-item-title class="clearfix">
                      <div class="message-data align-right">
                        <span class="message-data-time">{{message.time}}</span> &nbsp; &nbsp;
                        <span class="message-data-name">{{message.senderName}}</span>
                      </div>
                      <div class="message other-message">{{message.message}}</div>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
              <v-list-item-group>
                <v-list-item-group>
                  <v-list-item v-for="(message, i) in sentMessages" :key="i">
                    <v-list-item-content>
                      <v-list-item-title class="clearfix">
                        <div class="message-data">
                          <span class="message-data-time">{{message.time}}</span> &nbsp; &nbsp;
                          <span class="message-data-name">{{message.sender}}</span>
                        </div>
                        <div class="message my-message">{{message.text}}</div>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list-item-group>
            </v-list>
          </div>
          <!-- end chat-history -->

          <div class="chat-message clearfix">
            <textarea
              name="message-to-send"
              id="message-to-send"
              placeholder="Type your message"
              rows="3"
            ></textarea>

            <i class="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
            <i class="fa fa-file-image-o"></i>

            <button>Send</button>
          </div>
          <!-- end chat-message -->
        </div>
        <!-- end chat -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
//import { _ } from "vue-underscore";
export default {
  data: () => ({
    selected: [],
    personel: [],
    user_to: null,
    message: null,
    conversationWith: null,
    page: 1,
    receivedMessages: [],
    sentMessages: [],
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

    async messageDetails(id) {
      await axios
        .get("/messages/:id", {
          params: {
            id: id
          }
        })
        .then(response => {
          //   this.receivedMessages = response.data;

          response.data.forEach(el => {
            if (el.userTo === localStorage.getItem("tokenUserId")) {
              this.receivedMessages.push(el);
            } else {
              this.sentMessages.push(el);
            }

            this.conversationWith = el.senderName;
          });

          this.updtateMessage(id);
        })
        .catch();
    },

    async updtateMessage(id) {
      await axios
        .put("/messages/:id", {
          id: id
        })
        .then()
        .catch();
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
@import url("https://fonts.googleapis.com/css?family=Lato:400, 700");

$green: #86bb71;
$blue: #94c2ed;
$orange: #e38968;
$gray: #92959e;

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

  .chat {
    background: #f2f5f8;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;

    color: #434651;

    .chat-header {
      background: #fff;
      color: #214e41;
      border-radius: 5px;
      padding: 16px;
      border-bottom: 2px solid white;

      .chat-about {
        padding-left: 10px;
        margin-top: 6px;
        text-align: right;
      }

      .chat-with {
        font-weight: bolder;
        font-size: 16px;
        text-transform: uppercase;
      }

      .chat-num-messages {
        color: $gray;
      }
    }

    .chat-history {
      padding: 30px 30px 20px;
      border-bottom: 2px solid white;
      overflow-y: scroll;
      height: 500px;

      .v-list {
        background: #f2f5f8;
        .v-item-group {
          .v-list-item {
            .v-list-item__content {
              padding: 0;
            }
          }
        }
      }

      .message-data {
        margin-bottom: 15px;
      }

      .message-data-time {
        color: lighten($gray, 8%);
        padding-left: 6px;
      }

      .message {
        color: white;
        padding: 18px 20px;
        line-height: 26px;
        font-size: 16px;
        border-radius: 7px;
        margin-bottom: 10px;
        width: auto;
        position: relative;

        &:after {
          bottom: 100%;
          left: 7%;
          border: solid transparent;
          content: " ";
          height: 0;
          width: 0;
          position: absolute;
          pointer-events: none;
          border-bottom-color: $green;
          border-width: 10px;
          margin-left: -10px;
        }
      }

      .my-message {
        background: $green;
      }

      .other-message {
        background: $blue;
        float: right;
        text-align: right;
        &:after {
          border-bottom-color: $blue;
          left: 93%;
        }
      }
    }

    .chat-message {
      padding-top: 10px;
      margin-top: 10px;
      textarea {
        width: 100%;
        border: none;
        padding: 10px 20px;
        font: 14px/22px "Lato", Arial, sans-serif;
        // margin-bottom: 10px;
        border-radius: 5px;
        resize: none;
        position: relative;
        background: #fff;
      }

      button {
        float: right;
        color: #214e41;
        font-size: 16px;
        text-transform: uppercase;
        border: none;
        cursor: pointer;
        font-weight: bold;
        position: absolute;
        right: 2.5rem;
        bottom: 7rem;

        &:hover {
          color: darken($blue, 7%);
        }
      }
    }

    .align-right {
      text-align: right;
    }
  }
}
</style>