const express = require("express");
let router = express.Router();
const mongo = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";

async function checkUser() {
  const connection = await mongo.connect(url, { useNewUrlParser: true });
  return connection.db("peltier").collection("bookings");
}

// get bookings

router.get("/", async function(req, res) {
  let date = req.query.date;
  let query = await checkUser();
  let search = await query.find({ date: date }).toArray();
  if (search.length > 0) {
    res.send(search).end();
  } else {
    res.sendStatus(404).end();
  }
});

// Edit item

router.put("/", async function(req, res) {

  console.log(req.body);
  // get ObjectID from mongo for the query

  let ObjectID = require("mongodb").ObjectID;

  let query = await checkUser();

  await query.updateOne(
    { _id: ObjectID(req.body._id) },
    {
      $set: {
        nom: req.body.nom,
        téléphone: req.body.téléphone,
        genre: req.body.genre,
        date: req.body.date,
        heure: req.body.heure
      }
    },
    function(err, data) {
      if (err) throw err;
      if (data.matchedCount) {
        res.status(200).send();
      }
    }
  );
});

// Delete item 
router.post("/", async function(req, res) {
  let id = req.body.item;
  // get ObjectID from mongo for the query

    let ObjectID = require("mongodb").ObjectID;


    let query = await checkUser();

     await query.deleteOne(
      { _id: ObjectID(id) },
      function(err, data) {
        if (err) throw err;
        if (data) {
          res.status(200).send();
        }
      }
    );


});

module.exports = router;
