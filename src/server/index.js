// Declaring Global Variables
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const path = require('path');

const mockAPIResponse = require('./mockAPI.js');

// Creating an express object
const app = express();

//Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Declare static content
app.use(express.static('dist'));
console.log(__dirname);

// Intializing the server
const port = 5000;
const server = app.listen(port, listening);
function listening() {
  console.log(`running on localhost: ${port}`);
  console.log('API ID: ' + process.env.API_ID);
}

// Initialize all route with a callback function
app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
    // res.sendFile(path.resolve('src/client/views/index.html')
  });

//app.post('/address', function(req, res){
//    let programData = fetchData.acquireData(req.body.text);
//    console.log(programData);
//    console.log(post url found);
//})

app.post('/results', acquireData);

function acquireData(req, res){
    console.log('--Inside Fetch --');
    const AYLIENTextAPI = require('aylien_textapi');

    const textapi = new AYLIENTextAPI({
        application_id: process.env.API_ID,
        application_key: process.env.API_KEY
    });

    textapi.sentiment({
        url: req.body.url,
    },
    function(error, response) {
        if (error === null) {
            console.log(response);
            res.send(response);
        }
    });
}

// Initialize all route with a callback function
app.get('/test', function (req, res) {
    res.send(mockAPI);
  });