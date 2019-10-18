const express = require("express");
let router = express.Router();
const mongo = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const _ = require("underscore");

async function checkUser() {
  const connection = await mongo.connect(url, { useNewUrlParser: true });
  return connection.db("peltier").collection("bookings");
}

// Sort object function
function sortProperties(obj, sortedBy, isNumericSort, reverse) {
  sortedBy = sortedBy || 1; // by default first key
  isNumericSort = isNumericSort || false; // by default text sort
  reverse = reverse || false; // by default no reverse

  var reversed = reverse ? -1 : 1;

  var sortable = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      sortable.push([key, obj[key]]);
    }
  }
  if (isNumericSort)
    sortable.sort(function(a, b) {
      return reversed * (a[1][sortedBy] - b[1][sortedBy]);
    });
  else
    sortable.sort(function(a, b) {
      var x = a[1][sortedBy].toLowerCase(),
        y = b[1][sortedBy].toLowerCase();
      return x < y ? reversed * -1 : x > y ? reversed : 0;
    });

  return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
}

// get bookings

router.get("/", async function(req, res) {
  let date = req.query.date;
  let query = await checkUser();
  let search = await query.find({ date: date }).toArray();
  if (search.length > 0) {
  
  // send available hours with ascending order
  
    console.log(search);
    res.send(search).end();
  } else {
    res.sendStatus(404).end();
  }
});

// Edit item

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
        heure: req.body.heure
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

// Delete item
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
