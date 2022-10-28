const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const { fileURLToPath } = require('url');

// TODO: Logic for sending all the content of db/diagnostics.json
// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
    readFromFile('./db/diagnostics.json')
        .then((data) => res.status(201).send(JSON.parse(data)));
});

// TODO: Logic for appending data to the db/diagnostics.json file
// POST Route for a error logging
diagnostics.post('/', (req, res) => {
    // check if there is at least one property
    if (Object.keys(req.body).length !== 0){
        // deconstruct req.body
        const {username, topic, tip} = req.body;

        const newDiagnostic = {
            time: Date.now(),
            error_id: uuidv4(),
            errors: {
                username,
                topic,
                tip
            }
        };
        
        readAndAppend(newDiagnostic, './db/diagnostics.json');
        res.json(`Diagnostic added successfully 🚀`);
    } else {
        res.json('Error in adding diagnostic');
    }
});

module.exports = diagnostics;
