const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const diagsArr = require('../db/diagnostics.json');
const { fileURLToPath } = require('url');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
    res.status(201).send(diagsArr);

  // TODO: Logic for sending all the content of db/diagnostics.json
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
    
    const [{username, topic, tip}] = req.body;

    console.log(username, topic, tip);
    console.log(req.body);
    // if (username && topic && tip){
        const newTip = {
            username,
            topic,
            tip
        };

        diagsArr.push(newTip);

    readAndAppend(diagsArr,'./db/diagnostics.json');
    
    res.status(201).send('File written to successfully')
            // .then(()=>res.status(201).send(newTip))
            // .catch(err=>res.status(500).send(err.message))

    // }


  // TODO: Logic for appending data to the db/diagnostics.json file
});

module.exports = diagnostics;
