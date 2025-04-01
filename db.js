const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017/hotels' //we can replace Hotels to any other database name

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