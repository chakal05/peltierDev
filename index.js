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

const reservations = require('./routes/requests/reservations');
const login = require('./routes/requests/login');
const loadHours = require('./routes/requests/loadHours');
const register = require('./routes/requests/register');
app.use('/requests/reservations', reservations);
app.use('/requests/login', login);
app.use('/requests/loadHours', loadHours);
app.use('/requests/register', register);


const port = process.env.port || 5000;
app.listen(port, () => console.log("app running on port 5000"));
