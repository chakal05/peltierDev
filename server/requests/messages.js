const express = require("express");
let router = express.Router();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/peltier", { useNewUrlParser: true });

// 'useFindAndModify' set to false
mongoose.set("useFindAndModify", false);
//Connection to db

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// Message schema

const messageSchema = new mongoose.Schema({
  conversationId: Number,
  userFrom: String,
  userTo: String,
  message: String,
  time: String,
  userToRead: String
});

async function loadPatients() {
  let message = mongoose.model("message", messageSchema);
  return message;
}

// add Message

router.post("/", async function(req, res) {
  console.log(req.body);
});

// get personel list

router.get("/", async function(req, res) {
  if (req) console.log(req.headers.authorization);
});

// Edit Message

router.put("/", async function(req, res) {
  console.log(req.body);
});

// delete Message

router.delete("/", async function(req, res) {
  console.log(req.body);
});

module.exports = router;
