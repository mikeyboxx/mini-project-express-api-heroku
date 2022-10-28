const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend } = require('../helpers/fsUtils');
const diagsArr = require('../db/diagnostics.json');
const { fileURLToPath } = require('url');

// TODO: Logic for sending all the content of db/diagnostics.json
// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
    res.status(201).send(diagsArr);
});

// TODO: Logic for appending data to the db/diagnostics.json file
// POST Route for a error logging
diagnostics.post('/', (req, res) => {
    // deconstruct req.body
    const {username, topic, tip} = req.body;

    const newTip = {
        time: Date.now(),
        error_id: uuidv4(),
        username,
        topic,
        tip
    };

    diagsArr.push(newTip);
    
    readAndAppend(JSON.stringify(diagsArr), './db/diagnostics.json');

    return res.status(201).send({
        status: 'success',
        data: newTip
    });
});

module.exports = diagnostics;
