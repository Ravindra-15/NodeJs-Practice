const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

//post method to get the person data
router.post('/', async (req, res) => {
    try {
        const data = req.body; // Assuming the request body contains the person data

        // Create a new person document using mongoose model
        const newPerson = new Person(data);

        // Save the new person to the database
        const responsen = await newPerson.save();
        console.log('Data saved:', responsen);
        res.status(200).json(responsen);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get method to get the person data
router.get('/', async (req, res) => {
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