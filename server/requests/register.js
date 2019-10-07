const express = require("express");
const router = express.Router();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/peltier", { useNewUrlParser: true });

//Connection URL
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

var bookingSchema = new mongoose.Schema({
  nom: String,
  prénom: String,
  téléphone: Number,
  genre: String,
  date: String,
  heure: String
});
async function loadTider() {
  let booking = mongoose.model("booking", bookingSchema);
  return booking;
}

// TODO Send the _id if they want an email confirmation and send email

router.post("/", async function(req, res) {

 // const nyTid = {
 //   nom: req.body.prenom  + ' ' + req.body.nom ,
 //   téléphone: req.body.telephone,
 //   genre: req.body.genre,
 //   date: req.body.date,
 //   heure: req.body.time
 // };
//
 // var connexion = await loadTider();
 // var post = new connexion(nyTid);
//
 // if (post.save()) {
 //   console.log("inserted new row");
 //   res.status(200).end();
 // }

console.log(req.body);
});

module.exports = router;