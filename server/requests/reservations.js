const express = require("express");
let router = express.Router();
const mongo = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";

async function checkUser() {
  const connection = await mongo.connect(url, { useNewUrlParser: true });
  return connection.db("peltier").collection("bookings");
}

// Retrieve bookings
//{ projection: { _id: 0, date: 0, __v: 0 } }

router.post("/", async function(req, res) {
  let date = req.body.date;
  let query = await checkUser();
  let search = await query
    .find({ date: date })
    .toArray();
  if (search.length > 0) {
    res.send(search).end();
  } else {
    res.sendStatus(404).end();
  }
});

// Edit item

router.put("/", async function(req, res) {
  // get ObjectID from mongo for the query

  let ObjectID = require('mongodb').ObjectID;

  // let query =

  let query = await checkUser();

   await query.updateOne(
    { "_id": ObjectID(req.body.item._id) },
    {
      $set: {
        nom: req.body.item.nom,
        téléphone: req.body.item.téléphone,
        genre: req.body.item.genre,
        date: req.body.item.date,
        heure: req.body.item.heure
      }
    },
    function(err, data) {
      if (err) throw err;
      if(data.matchedCount){
        res.status(200).send();
      }
     
    }
  );
});

module.exports = router;
