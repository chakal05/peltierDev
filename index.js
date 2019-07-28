const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoStore = require("connect-mongo")(session);
const SESSION_SECRET = "dfdfd";
// Routers

const reservations = require("./requests/reservations");
const login = require("./requests/login");
const loadHours = require("./requests/loadHours");
const register = require("./requests/register");

// Middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(
  session({
    store: new mongoStore({ url: 'mongodb://localhost:27017/peltier' }),
    name: "tid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      //    //secure: process.env.NODE_ENV === "production",  // this needs HTTPS connection
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
  })
);
app.use("/requests/reservations", reservations);
app.use("/requests/login", login);
app.use("/requests/loadHours", loadHours);
app.use("/requests/register", register);

// Static folder
app.use(express.static(__dirname + "/public/"));
// SPA
app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));

// Session middleware

const port = process.env.port || 5000;
app.listen(port, () => console.log("app running on port 5000"));
