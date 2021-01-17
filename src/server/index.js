const dotenv = require("dotenv");
dotenv.config();
const API_KEY = process.env.API_KEY;

var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
var bodyParser = require('body-parser')
var cors = require('cors');
const fetch = require("node-fetch");

var json = {
    'title': 'test json response',
    'message': 'this is a message',
    'time': 'now'
}

const baseUrl = "https://api.meaningcloud.com/sentiment-2.1?key=";

const app = express()
app.use(cors())
    // to use json
app.use(bodyParser.json())
    // to use url encoded values
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static('dist'))

console.log(JSON.stringify(mockAPIResponse))

app.get('/', function(req, res) {
    res.sendFile('dist/index.html')
})

app.post('/articleinfo', async function(request, response) {

    //console.log(baseUrl + API_KEY + "&lang=auto&url=" + request.body.url);
    const data = await fetch(baseUrl + API_KEY + "&lang=auto&url=" + request.body.url);
    try {
        // Transform into JSON
        const MeaningData = await data.json();
        response.send(MeaningData)
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
});

app.get('/GetAPIResponse', function(req, res) {
    res.json(mockAPIResponse);
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function() {
    console.log('Example app listening on port 8081!')
})