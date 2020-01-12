const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/peltier", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 'useFindAndModify' set to false

mongoose.set("useFindAndModify", false);
//Connection to db

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// Message schema

const messageSchema = new mongoose.Schema({
  senderName : String,
  userFrom: String,
  userTo: String,
  message: String,
  time: String,
  userToRead: String
});

const conversationSchema = new mongoose.Schema({
  userOne: String,
  userTwo: String
});

const personelSchema = new mongoose.Schema({
  //name: String
  //departement: String,
  //telephone: Number,
  //email: String,
  //adresse: String,
  //city: String,
  //birthdate: String,
  //username: String,
  //password: String,
  //profil: String
});

async function loadMessages() {
  let message = mongoose.model("messages", messageSchema);
  return message;
}

async function loadConversations() {
  let conversation = mongoose.model("conversations", conversationSchema);
  return conversation;
}

async function loadPersonel() {
  let personel = mongoose.model("personel", personelSchema);
  return personel;
}

// add Message

router.post("/", async function(req, res) {
  let payload = {
    senderName: req.body.name,
    userFrom: req.body.from,
    userTo: req.body.to,
    message: req.body.message,
    time: req.body.time,
    userToRead: req.body.user_to_read
  };

  let query = await loadMessages();
  const newMessage = new query(payload);
  newMessage.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(`Message from db: Inserted a new row`);
  });
});

// get personel list

router.get("/", async function(req, res) {
  // Get all personel except the one currently logged in

  if (req.query.data === "personel") {
    let query = await loadPersonel();
    query
      .find(
        { _id: { $ne: req.query.id } },
        {
          departement: 0,
          telephone: 0,
          email: 0,
          adresse: 0,
          city: 0,
          birthdate: 0,
          password: 0
        },
        (error, personelList) => {
          if (error) return res.status(500).send(error);
          return res.status(200).send(personelList);
        }
      )
      .catch(err => {
        throw err;
      });
  }

  // Get all messages

  if (req.query.data === "messages") {
    let query = await loadMessages();
    query.find({ userTo: req.query.id }, (error, messages) => {
      if (error) return res.status(500).send(error);
      return res.status(200).send(messages);
     
    }).catch(err => {
      throw err;
    });
  }
});

// delete Message

router.delete("/", async function(req, res) {
  console.log(req.body);
});

module.exports = router;
