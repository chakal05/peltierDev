const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: 'http://localhost:8080'}));
// Routers

const login = require("./requests/login");
app.use("/login", login);

// Middleware
//  Check for token for protected routes

app.use(function(req, res, next) {
  if (!req.headers.authorization) {
    res.status(403).json({ message: "Unauthorized" });
  } else {
    next();
  }
});

const reservations = require("./requests/reservations");
const personel = require("./requests/personel");
const patients = require("./requests/patient");
const messages = require("./requests/messages");

app.use("/reservations", reservations);
app.use("/personel", personel);
app.use("/patient", patients);
app.use("/messages", messages);


const port = process.env.port || 4000;
let server = app.listen(port, () => console.log("APP RUNNING ON PORT 4000"));
//const socket = require('socket.io')(server);
//
//socket.on('connection', (socket) => {
//  console.log(socket.id);
//})




// Static folder
//app.use(express.static(__dirname + "/public/"));
// SPA
//app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
//