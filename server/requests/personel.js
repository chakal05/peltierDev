const express = require("express");
let router = express.Router();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/peltier", { useNewUrlParser: true });

// 'useFindAndModify' set to false
mongoose.set("useFindAndModify", false);
//Connection to db

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

const personelSchema = new mongoose.Schema({
  name: String,
  departement: String,
  telephone: Number,
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
  let br = [
    {
      "name" : "Fozia Farah Fouad",
      "departement" : "Pharmacy",
      "telephone" : 63323233,
      "username" : "foziaFouad",
      "password" : "ds443",
      "profil" : "doctor"
    },
    {
      "name" : "Jamal Mohamed Ahmed",
      "departement" : "Neurology",
      "telephone" : 62223322,
      "username" : "jam09-",
      "password" : "sdlp0",
      "profil" : "doctor"
    },
    {
      "name" : "Amin Ahmed Guedid",
      "departement" : "General medecine",
      "telephone" : 302232332,
      "username" : "aaaaaaaaaa",
      "password" : "0-dss",
      "profil" : "doctor"
    },
    {
      "name" : "Habone Abdi Ahmed",
      "departement" : "Laboratory",
      "telephone" : 92722323,
      "username" : "habone",
      "password" : "23sdd",
      "profil" : "doctor"
    },
    {
      "name" : "Yacin Hassan Abdourahman",
      "departement" : "Neurology",
      "telephone" : 11122121,
      "username" : "xxcs0",
      "password" : "90sd90",
      "profil" : "doctor"
    },
    {
      "name" : "Alain Mohamed Ali",
      "departement" : "Cardiology",
      "telephone" : 32323,
      "username" : "alimohamedali",
      "password" : "sssd",
      "profil" : "doctor"
    },
    {
      "name" : "Amina Amina Amina",
      "departement" : "Maternity",
      "telephone" : 111111111,
      "username" : "aminaAmina",
      "password" : "232323",
      "profil" : "doctor"
    },
    {
      "name" : "Fozia Fozia Fozia",
      "departement" : "Pediatrie",
      "telephone" : 2323232323,
      "username" : "Fozia",
      "password" : "sdsdsdsd",
      "profil" : "doctor"
    },
    {
      "name" : "Omar Hassan Houssein",
      "departement" : "Radiology",
      "telephone" : 12121212,
      "username" : "omarHassan",
      "password" : "ssdsds",
      "profil" : "doctor"
    },
    {
      "name" : "Soule Souleiman",
      "departement" : "General medicine",
      "telephone" : 111111111,
      "username" : "soule",
      "password" : "23232323",
      "profil" : "doctor"
    },
    {
      "name" : "Waberi Yonis",
      "departement" : "General medecine",
      "telephone" : 12787812,
      "username" : "waberiYonis",
      "password" : "asasas",
      "profil" : "doctor"
    },
    {
      "name" : "Moumin Farhan Yonis",
      "telephone" : 12121212,
      "username" : "mouminFarYonis",
      "password" : "asasdssas",
      "profil" : "admin"
    },
    {
      "name" : "Jamila Ali Omar",
      "telephone" : 13232323,
      "username" : "jamialis",
      "password" : "sdsdsdaw23",
      "profil" : "admin"
    },
    {
      "name" : "Farhan ALi Dahir",
      "departement" : "General medecine",
      "telephone" : 545454545,
      "username" : "fardah",
      "password" : "wwe23434",
      "profil" : "nurse"
    },
    {
      "name" : "Amina Dalier Omar",
      "departement" : "General medecine",
      "telephone" : 454566767,
      "username" : "aminOma",
      "password" : "4545fgfg",
      "profil" : "nurse"
    },
    {
      "name" : "Noura Farah Elmi",
      "departement" : "General medecine",
      "telephone" : 13423434,
      "username" : "sdsdaew",
      "password" : "sdsdwew",
      "profil" : "nurse"
    },
    {
      "name" : "Zeinab Mahamoud Dahir",
      "departement" : "General medecine",
      "telephone" : 78787878,
      "username" : "zeinmoh",
      "password" : "dfer3434",
      "profil" : "nurse"
    }
    
  ];
  const query = await loadPersonel();
  const newPersonel = new query(br);
  newPersonel.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(`Message from db: Inserted a new row`);
  });
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
      return res.status(200);
    }
  );
});

// delete personel

router.delete("/", async function(req, res) {
  id = req.body._id;
  let query = await loadPersonel();
  query.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(500).send(err);
    console.log(`Deleted one item`);
    return res.status(200);
  });
});

module.exports = router;
