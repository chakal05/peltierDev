<template>
<div></div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    items: [],
    sender: null,
    message: null
  }),

  methods: {
    async messageDetails() {
      await axios
        .get("/messages/:id", {
          params: {
            id: this.$route.params.id
          }
        })
        .then(response => {
          this.items = response.data;
        })
        .catch();
    },

    async updtateMessage() {
      await axios
        .put("/messages/:id", {
          id: this.$route.params.id
        })
        .then()
        .catch();
    },

    getInfo() {
      axios.all([this.messageDetails(), this.updtateMessage()]);
    },

    async respond() {
      let date = new Date().toISOString().substring(0, 10);
      let hour = new Date().getHours();
      let minute = new Date().getMinutes();
      let timestamp = `${date} at ${hour}:${minute}`;
      await axios
        .post("/messages", {
          name: localStorage.getItem("tokenUserName"),
          to: this.sender,
          from: localStorage.getItem("tokenUserId"),
          time: timestamp,
          headline: this.headline,
          message: this.message,
          user_to_read: "no" // 0 or 1
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
  },

  created() {
    this.getInfo();
  }
};
</script>

<style lang='scss'>
@import url(https://fonts.googleapis.com/css?family=Lato:400,700);


.container {
// 
}
</style>