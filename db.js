const mongoose = require('mongoose');
require('dotenv').config();
// const mongoURL = process.env.MONGODB_URL_LOCAL; //we can replace Hotels to any other database name
 const mongoURL = process.env.MONGODB_URL;
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//get the default connection
//mongoose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection;

//define event listeners for database connection
db.on('connected', () => {
    console.log('Connected to MongoDB server');
});
db.on('error', (err) => {
    console.log('MongoDB connection error: ', err);
});
db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

//exporst the database connection

module.exports = db;