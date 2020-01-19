<template>
  <v-container>
    <div class="text-center">
      <h2 class="display-2 font-weight-thin mb-4">Messages</h2>
    </div>
    <br />
    <v-list two-line>
      <v-list-item-group v-model="selected"  multiple active-class="teal--text">
      
        <template v-for="(item, index) in items">
        
          <v-list-item :key="item._id">
            <template v-slot:default="{  }">
              <v-list-item-content @click="readMessage(item._id)">
                 
                <v-list-item-title v-text="item.senderName"></v-list-item-title>
                <v-list-item-subtitle class="text--teal darken-4" v-text="item.headline"></v-list-item-subtitle>
                <v-list-item-subtitle v-text="item.message"></v-list-item-subtitle>
             
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text v-text="item.time"></v-list-item-action-text>
                <v-icon color="teal darken-4">star_border</v-icon>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
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
              if(element.userToRead === 'no'){
                this.selected.push(this.items.indexOf(element));
              }
            });
         })
        .catch(err => {
          throw err;
        });
    },

  readMessage(id){
    this.$router.push({name:'readMessage', params:{id: id}});
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

<style>
</style>