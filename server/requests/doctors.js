const express = require("express");
let router = express.Router();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/peltier", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
//Connection URL
const db = mongoose.connection;
if (db) {
  console.log(`connected to db`);
}
db.on("error", console.error.bind(console, "connection error:"));

var doctorSchema = new mongoose.Schema({
  name: String,
  departement: String,
  telephone: Number,
  username: String,
  password: String
});
async function loadTider() {
  let doctor = mongoose.model("doctor", doctorSchema);
  return doctor;
}

// add a doctor to the list of doctors

router.post("/", async function(req, res) {
  const doctor = await loadTider();
  const newDoctor = new doctor(req.body);
  newDoctor.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(`Message from db: Inserted a new row`);
  });
});

// get doctors list

router.get("/", async function(req, res) {
  let query = await loadTider();
  await query.find((error, doctors) => {
    if (error) return res.status(500).send(error);
    return res.status(200).send(doctors);
  });
});

// Edit doctor

router.put("/", async function(req, res) {
  
  let query = await loadTider();
 await query.findByIdAndUpdate(
   req.body.id,
   req.body,
   {new: true},

   (err, doctor) => {
     if(err) return res.status(500).send(err);
     console.log(doctor);
     return res.status(200);

   }
 )
})
/*
// delete doctor 

router.post("/", async function(req, res) {
  let id = req.body.item;

  if (id) {
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
  }else{

  }
});

*/
module.exports = router;
