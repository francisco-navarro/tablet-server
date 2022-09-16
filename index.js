const simConnect = require('msfs-simconnect-nodejs');
const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const vjoy = require('./vjoy.js');

const app = express()
const port = 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(express.static('public'));
app.use(favicon(__dirname + '/public/img/favicon.ico'));

app.get('/api', (req, res) => {
  console.log('api get request');
  res.send("GET Request Called");
})
app.post('/api', (req, res) => {
  console.log('api post request', req.body && req.body.button);
  res.send({});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



// ----------------






console.log("Trying to connect...")



var success = simConnect.open("MyAppName", function(name, version) {
    console.log("\n-----------------------------\nConnected to: " + name + "\nSimConnect version: " + version + "\n-----");

    simConnect.requestDataOnSimObject([
        ["Plane Latitude", "degrees"],
        ["Plane Longitude", "degrees"],  
        ["PLANE ALTITUDE", "feet"],

    ], (data) => {
        // Called when data is received
        console.log(
            "Latitude:  " + data["Plane Latitude"] + "\n" +
            "Longitude: " + data["Plane Longitude"] + "\n" +
            "Altitude:  " + data["PLANE ALTITUDE"] + " feet"
        );
    }, 
    simConnect.objectId.USER,               // User aircraft
    simConnect.period.SIM_FRAME,            // Get data every sim frame...
    simConnect.dataRequestFlag.CHANGED      // ...but only if one of the variables have changed
);
            
}, () => {
    console.log("Simulator exited by user");
}, (exception) => {
    console.log("SimConnect exception: " + exception.name + " (" + exception.dwException + ", " + exception.dwSendID + ", " + exception.dwIndex + ", " + exception.cbData + ")");
}, (error) => {
    console.log("Undexpected disconnect/error: " + error); // Look up error code in ntstatus.h for details
});