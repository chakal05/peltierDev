const express = require('express');
let router = express.Router();
const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';



async function checkUser() {
    const connection = await mongo.connect(url, { useNewUrlParser: true });
    return connection.db('peltier').collection('bookings');
}




router.post('/', async function(req, res) {
   

    let date = req.body.date;
    let query = await checkUser();
    let search = await query.find({ date: date }, { projection: { _id: 0, date: 0, __v: 0 } }).toArray();
    if (search.length > 0) {
        res.send(search).end();
        console.log(search);
    } else {
        res.sendStatus(404).end();
    }
})




module.exports = router;