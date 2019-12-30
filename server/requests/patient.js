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

const patientSchema = new mongoose.Schema({
  name: String,
  telephone: Number,
  email: String,
  adresse: String,
  city : String,
  birthdate: String,
  username: String,
  password: String,
  doctor: String,
  profil: String
});

async function loadPatients() {
  let patient = mongoose.model("patient", patientSchema);
  return patient;
}

// add personel

router.post("/", async function(req, res) {
  console.log(req.body);
  if(req.body.flag === 'log'){
    let query = await loadPatients();
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
  }else{
    const query = await loadPatients();
  const newPatient = new query(req.body);
  newPatient.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(`Message from db: Inserted a new row`);
  });
  }

  
  
});

// get personel list

router.get("/", async function(req, res) {
  
  let query = await loadPatients();
  await query.find({ profil: req.query.profil }, (error, patientsList) => {
    if (error) return res.status(500).send(error);
    console.log(patientsList.length);
    return res.status(200).send(patientsList);
  });
});

// Edit personel

router.put("/", async function(req, res) {

  let query = await loadPatients();
  await query.findByIdAndUpdate(
    req.body.id,
    req.body,
    { new: true },

    err => {
      if (err) return res.status(500).send(err);
      return res.status(200).send('Edited one item from server/personel');
    }
  );
});

// delete personel

router.delete("/", async function(req, res) {
console.log(req.body);
  id = req.body._id;
  let query = await loadPatients();
  query.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(`Deleted one item`);
  });
});


module.exports = router;
