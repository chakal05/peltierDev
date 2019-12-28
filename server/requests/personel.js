const express = require("express");
let router = express.Router();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/peltier", { useNewUrlParser: true });

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
  console.log(req.body);
  if (req.body.flag === "log") {
    let query = await loadPersonel();
    await query.findOne(
      {
        username: req.body.username,
        password: req.body.password,
        profil: req.body.profil
      },
      (error, persone) => {
        if (error) return res.status(500).send(error);
        else console.log(persone);
        return res.status(200).send(persone);
      }
    );
  } else {
    const query = await loadPersonel();
    const newPersonel = new query(req.body);
    newPersonel.save(err => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(`Message from db: Inserted a new row`);
    });
  }
});

// get personel list

router.get("/", async function(req, res) {
  console.log(req.query);

  let query = await loadPersonel();
  await query.find({ profil: req.query.profil }, (error, personelList) => {
    if (error) return res.status(500).send(error);
    console.log(personelList);
    return res.status(200).send(personelList);
  });
});

// Edit personel

router.put("/", async function(req, res) {
  let query = await loadPersonel();
  await query.findByIdAndUpdate(
    req.body.id,
    req.body,
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
