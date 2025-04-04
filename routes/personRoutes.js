const express = require('express');
const router = express.Router();
const Person = require('./../models/person');
const { jwtAuthMiddleware, generateToken } = require('./../jwt');
const { JsonWebTokenError } = require('jsonwebtoken');
//post method to get the person data
router.post('/signup', async (req, res) => {
    try {
        const data = req.body; // Assuming the request body contains the person data

        // Create a new person document using mongoose model
        const newPerson = new Person(data);

        // Save the new person to the database
        const response = await newPerson.save();
        console.log('Data saved:', response);

        const payload = {
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is: ", token);

        res.status(200).json({ response: response, token: token });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Login  Route
router.post('/login', async (req, res) => {
    try {
        //Extract username and password from request body
        const { username, password } = req.body;

        //find user by username
        const user = await Person.findOne({ username: username });
        //if user does not exist or password does not match, return error
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid username or Password' });

        }
        //generate token
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);

        //return token as response
        res.json({ token })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });

    }
});

//Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user;
        console.log("User Data: ", userData);
        const userId = userData.id;
        const user = await Person.findById(userId);
        res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//get method to get the person data
router.get('/', jwtAuthMiddleware, async (req, res) => {
    try {
        const data = await Person.find();  //  Correct (uppercase 'P')
        console.log('Data fetched:', data);
        res.status(200).json(data);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;  //Extract the worktype from the url parameter
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({ work: workType });
            console.log('data fetched');
            res.status(200).json(response);

        }
        else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const person_id = req.params.id; //extract the id from the url parameter
        const updatedPersonData = req.body; //updated data for the person

        const response = await Person.findByIdAndUpdate(person_id, updatedPersonData, {
            new: true, //Return the updated document
            runValidators: true, //Run mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        consosle.log("Data updated");
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const person_id = req.params.id; //extract the id from the url parameter

        //Assume you have a person mopdel
        const response = await Person.findByIdAndRemove(personId);
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        consosle.log("Data deleted");
        res.status(200).json({ message: 'person deleted successfully' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;