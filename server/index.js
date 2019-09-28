const express = require("express");
const app = express();

// Routers

const reservations = require("./requests/reservations");
const login = require("./requests/login");
const loadHours = require("./requests/loadHours");
const register = require("./requests/register");

// Middleware

app.use("/reservations", reservations);
app.use("/login", login);
app.use("/loadHours", loadHours);
app.use("/register", register);

//// Static folder
//app.use(express.static(__dirname + "/public/"));
//// SPA
//app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
//

const port = process.env.port || 5000;
app.listen(port, () => console.log("app running on port 5000"));
