const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: "http://localhost:8080" }));

const login = require("./requests/login");
app.use("/login", login);

app.use(function(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: "No credentials sent!" });
  }
  next();
});

const reservations = require("./requests/reservations");
const personel = require("./requests/personel");
const patients = require("./requests/patient");
const messages = require("./requests/messages");
const bedAllotment = require("./requests/bedAll");
const rapport = require("./requests/rapport");
const prescription = require('./requests/prescription');

app.use("/reservations", reservations);
app.use("/personel", personel);
app.use("/patient", patients);
app.use("/messages", messages);
app.use("/bedAll", bedAllotment);
app.use("/rapport", rapport);
app.use('/prescription', prescription);
const port = process.env.port || 4000;
let server = app.listen(port, () => console.log("APP RUNNING ON PORT 4000"));

// Static folder
app.use(express.static(__dirname + "/public/"));
 
//SPA
app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));

