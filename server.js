const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');


app.use(bodyParser.json());

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
const personRoutes = require('.routes/personRoutes');
const menuItemroutes = require('.routes/menuItemRoutes');
//use the routers
app.use('/person', personRoutes);
app.use('menu', menuItemRoutes);

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
