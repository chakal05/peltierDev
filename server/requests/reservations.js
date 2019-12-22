const express = require("express");
let router = express.Router();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/peltier", { useNewUrlParser: true });

// 'useFindAndModify' set to false
mongoose.set("useFindAndModify", false);
//Connection to db

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// Schema

const bookingSchema = new mongoose.Schema({
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

// get bookings

router.get("/", async function(req, res) {

  console.log(req.query);

  let query = await loadTider();

  if (req.query.date[1] === `hours`) {
    await query.find({ date: req.query.date[0] }, (error, booking) => {
      let timmars = [];

      if (error) return res.status(500).send(error);
      booking.forEach(element => {
        timmars.push(element.heure);
      });

      return res.status(200).send(timmars);
    });
  } else if (req.query.date[1] === "admin") {
    await query.find({ date: req.query.date[0] }, (error, booking) => {
      if (error) return res.status(500).send(error);
      console.log(
        booking.length + " bookings sent back for the " + req.query.date[0]
      );
      return res.status(200).send(booking);
    });
  } 
});

// Add a new appointment

router.post("/", async function(req, res) {
  console.log(req.body);

  let doc;

  if (req.body.docteur) {
    doc = req.body.docteur;
  } else {
    doc = "Assign Doctor";
  }

  const nyTid = {
    nom: req.body.nom,
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
    res.status(200).send(`Message from reservation.js: inserted one row`);
  }
});

// Edit item

router.put("/", async function(req, res) {

  console.log(req.body);

  let query = await loadTider();
  await query.findByIdAndUpdate(req.body.id, req.body, { new: true }, err => {
    if (err) return res.status(500).send(err);
    return res
      .status(200)
      .send(`Message from reservation.js: modified one row `);
  });
});

// Delete item

router.delete("/", async function(req, res) {
  id = req.body.id;
  let query = await loadTider();
  query.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(500).send(err);

    return res
      .status(200)
      .send(`Message from reservations.js: deleted one item `);
  });
});

module.exports = router;
