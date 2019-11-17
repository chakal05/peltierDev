const express = require("express");
let router = express.Router();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/peltier", { useNewUrlParser: true });

// 'useFindAndModify' set to false
mongoose.set("useFindAndModify", false);
//Connection to db

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

const doctorSchema = new mongoose.Schema({
  name: String,
  departement: String,
  telephone: Number,
  username: String,
  password: String
});

async function loadDoctor() {
  let doctor = mongoose.model("doctor", doctorSchema);
  return doctor;
}

// add a doctor

router.post("/", async function(req, res) {
  const doctor = await loadDoctor();
  const newDoctor = new doctor(req.body);
  newDoctor.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(`Message from db: Inserted a new row`);
  });
});

// get doctors list

router.get("/", async function(req, res) {
  let query = await loadDoctor();
  await query.find((error, doctors) => {
    if (error) return res.status(500).send(error);
    return res.status(200).send(doctors);
  });
});

// Edit doctor

router.put("/", async function(req, res) {
  let query = await loadDoctor();
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

// delete a doctor

router.delete("/", async function(req, res) {
  id = req.body._id;
  let query = await loadDoctor();
  query.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(500).send(err);

    // const response = {
    //   message: "Doctor successfully deleted from list",
    //   id: doc._id
    // };
    console.log(`Deleted one item`);
    return res.status(200);
  });
});

module.exports = router;
