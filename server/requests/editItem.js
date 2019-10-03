const express = require("express");
let router = express.Router();
const mongo = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";

async function checkUser() {
  const connection = await mongo.connect(url, { useNewUrlParser: true });
  return connection.db("peltier").collection("bookings");
}


module.exports = router;
