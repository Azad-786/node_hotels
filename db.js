const mongoose  = require('mongoose');
require("dotenv").config();

// local hosted mongodb databse link
// const mongoURL = "mongodb://localhost:27017/hotels"

// hosted mongodb database link
const mongoURL = process.env.DB_URL;

//setup mongodb
mongoose.connect(mongoURL, {
     useNewUrlParser: true,
     useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected', () => {
     console.log("Connected to MongoDB successfuly")
})

db.on('error', (err) =>{
console.log('MongoDB connection error', err)
})
db.on('disconnected', () =>{
     console.log('MongoDB disconnected');
})

module.exports = db; 