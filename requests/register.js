const express = require('express');
const router = express.Router();
//const nodemailer = require('nodemailer');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/peltier', { useNewUrlParser: true });

//Connection URL
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var bookingSchema = new mongoose.Schema({
	nom: String,
	prénom: String,
	téléphone: Number,
	email: String,
	date: String,
	heure: String
});
async function loadTider() {
	let booking = mongoose.model('booking', bookingSchema);
	return booking;
}

// TODO Send the _id if they want an email confirmation and send email

router.post('/', async function(req, res) {
	const nyTid = {
		nom: req.body.lastName,
		prénom: req.body.firstName,
		téléphone: req.body.phone,
		email: req.body.email,
		date: req.body.date,
		heure: req.body.time
	};

	var connexion = await loadTider();
	var post = new connexion(nyTid);

	if (post.save()) {
		/*
  todo ass SSL to work 

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'youremail@gmail.com',
        pass: 'yourpassword'
      }
    });
    
    var mailOptions = {
      from: 'youremail@gmail.com',
      to: 'myfriend@yahoo.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
*/
		res.status(200).end();
	}
});

module.exports = router;
