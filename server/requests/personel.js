const express = require("express");
let router = express.Router();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/peltier", { useNewUrlParser: true });
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(15);
// 'useFindAndModify' set to false
mongoose.set("useFindAndModify", false);
//Connection to db

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// Personel schema
//TODO bcrypt the passwords before putting them in db and
//TODO and decrypt when retrieved => security
const personelSchema = new mongoose.Schema({
  name: String,
  departement: String,
  telephone: Number,
  email: String,
  adresse: String,
  city: String,
  birthdate: String,
  username: String,
  password: String,
  profil: String
});

async function loadPersonel() {
  let personel = mongoose.model("personel", personelSchema);
  return personel;
}

// add personel

router.post("/", async function(req, res) {
 
    const query = await loadPersonel();
    let hashedPass = bcrypt.hashSync(req.body.password, salt);
    const newPersone = {
      name: req.body.name,
      departement: req.body.departement,
      telephone: req.body.telephone,
      email: req.body.email,
      adresse: req.body.adresse,
      city: req.body.city,
      birthdate: req.body.birthdate,
      username: req.body.name,
      password: hashedPass,
      profil: req.body.profil
      
    };

    const newPersonel = new query(newPersone);
    newPersonel.save(err => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(`Message from db: Inserted a new row`);
    });
  
});

// get personel list

router.get("/", async function(req, res) {
  let query = await loadPersonel();
  await query.find({ profil: req.query.profil }, (error, personelList) => {
    if (error) return res.status(500).send(error);
    return res.status(200).send(personelList);
  });
});

// Edit personel

router.put("/", async function(req, res) {
  let query = await loadPersonel();
  let hashedPass = bcrypt.hashSync(req.body.password, salt);
  const newPersone = {
    name: req.body.name,
    departement: req.body.departement,
    telephone: req.body.telephone,
    email: req.body.email,
    adresse: req.body.adresse,
    city: req.body.city,
    birthdate: req.body.birthdate,
    username: req.body.name,
    password: hashedPass
  };
  await query.findByIdAndUpdate(
    req.body.id,
    newPersone,
    { new: true },

    err => {
      if (err) return res.status(500).send(err);
      return res.status(200).send("Edited one item from server/personel");
    }
  );
});

// delete personel

router.delete("/", async function(req, res) {
  console.log(req.body);
  id = req.body._id;
  let query = await loadPersonel();
  query.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(`Deleted one item`);
  });
});

module.exports = router;