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
  heure: String,
  docteur: String,
  rank: Number
});
async function loadTider() {
  let booking = mongoose.model("booking", bookingSchema);
  return booking;
}

router.post("/", async function(req, res) {
  let nom;
  let doc;
  if (!req.body.prenom) {
    nom = req.body.nom;
  } else {
    nom = req.body.prenom + " " + req.body.nom;
  }

  if (req.body.docteur) {
    doc = req.body.docteur;
  } else {
    doc = "toAssign";
  }

  const nyTid = {
    nom: nom,
    téléphone: req.body.telephone,
    genre: req.body.genre,
    date: req.body.date,
    heure: req.body.time,
    docteur: doc,
    rank: req.body.rank
  };

  let connexion = await loadTider();
  let post = new connexion(nyTid);

  if (post.save()) {
    console.log(`Inserted one row`);
    res.status(200).end();
  }
});

module.exports = router;
