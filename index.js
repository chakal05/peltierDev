const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// Middleware 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

const reservations = require('./requests/reservations');
const login = require('./requests/login');
const loadHours = require('./requests/loadHours');
const register = require('./requests/register');
app.use('/requests/reservations', reservations);
app.use('/requests/login', login);
app.use('/requests/loadHours', loadHours);
app.use('/requests/register', register);


// Static folder
app.use(express.static(__dirname + '/public/'));
// SPA
app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));


const port = process.env.port || 5000;
app.listen(port, () => console.log("app running on port 5000"));
