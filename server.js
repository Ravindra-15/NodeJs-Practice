const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const passport = require('./auth'); 
require('dotenv').config();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
//Middleware function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next(); // move on to next phase
}
app.use(logRequest);

 
app.use(passport.initialize());
const localAuthMiddleware =  passport.authenticate('local', {session: false});
app.get('/', function (req, res) {
    res.send("Welcome sir!");
});

/*
app.post('/person', (req, res) => {
    const data = req.body //Assuming the request body contains the person data

    // create a new person document using mongoose model
    const newPerson = new Person(data);
    
    // newPerson.name = data.name;
    // newPerson.age = data.age;
    // newPerson.salary = data.salary;
    // newPerson.email = data.email;

    // Save the new person to the database
    newPerson.save((error, savedPerson) => {
        if(error){
            console.log('Error saving person data', error);
            res.status(500).json({error: 'internal server error'});
        }
        else{
            console.log('Data saved successfully'); 
            res.status(200).json(savedPerson);
        }
    });
});
*/

// app.get('/idli', (req, res) => {
//     var option_idli = {
//         name: 'Rava Idli',
//         size: '10 cm diameter',
//         is_sambhar:  true,
//         is_chutney:  false
//     }
//     res.send(option_idli);
// });

//importing the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
//use the routers
app.use('/person',personRoutes);
app.use('/menu', menuItemRoutes);

app.listen(PORT, () => {
    console.log('Server is listening on port 3000');
});
