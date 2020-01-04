require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const Mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const jwt = require('jsonwebtoken');
//

async function checkUser() {
  const connection = await Mongo.connect(url, { useNewUrlParser: true });
  return connection.db("peltier").collection("personels");
}

router.post("/", async function(req, res) {
  if (req.body.profil !== "patient") {

    let query = await checkUser();

    let result = await query.findOne({email: req.body.email});
  
    if (result) {
      let check = bcrypt.compareSync(req.body.password, result.password);

      if (check) {
        const accesToken = jwt.sign(result, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({ accesToken: accesToken });
      } else return res.status(503).send("password doesnt match dB pass");
    } else return res.status(503).send("unautorized");
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
