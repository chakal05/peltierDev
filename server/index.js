const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// Routers

const reservations = require("./requests/reservations");
const login = require("./requests/login");
const loadHours = require("./requests/loadHours");
const register = require("./requests/register");
const edit = require("./requests/editItem");

// Middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/reservations", reservations);
app.use("/login", login);
app.use("/loadHours", loadHours);
app.use("/register", register);
app.use("/edit", edit);
//// Static folder
//app.use(express.static(__dirname + "/public/"));
//// SPA
//app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
//

const port = process.env.port || 5000;
app.listen(port, () => console.log("app running on port 5000"));
