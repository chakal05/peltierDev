const express = require("express");
let router = express.Router();
const mongo = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
async function checkUser() {
  const connection = await mongo.connect(url, { useNewUrlParser: true });
  return connection.db("peltier").collection("doctors");
}

// get doctors list

router.get("/", async function(req, res) {
  let query = await checkUser();
  let search = await query.find().toArray();
  if (search.length > 0) {
    res.send(search).end();
    console.log(`Sent doctors list`);
  } else {
    res.sendStatus(404).end();
  }
});

// Edit doctor item

router.put("/", async function(req, res) {
  // get ObjectID from mongo for the query

  let ObjectID = require("mongodb").ObjectID;

  let query = await checkUser();

  await query.updateOne(
    { _id: ObjectID(req.body.id) },
    {
      $set: {
        nom: req.body.nom,
        téléphone: req.body.telephone,
        genre: req.body.genre,
        heure: req.body.time,
        docteur: req.body.docteur,
        rank: req.body.rank
      }
    },
    function(err, data) {
      if (err) throw err;
      if (data.modifiedCount === 1) {
        res.status(200).send();
        console.log("modified one item");
      }
    }
  );
});

// Delete doctor item

router.post("/", async function(req, res) {
  let id = req.body.item;

  // get ObjectID from mongo for the query

  let ObjectID = require("mongodb").ObjectID;
  let query = await checkUser();

  query.deleteOne({ _id: ObjectID(id) }, function(err, data) {
    if (err) throw err;
    if (data.deletedCount === 1) {
      console.log("deleted one item");
      res.status(200).send();
    }
  });
});

module.exports = router;
