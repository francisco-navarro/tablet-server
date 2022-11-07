const arduino = require('./node/arduino.js');
const express = require('./node/express.js');
const axios = require('axios');

const REFRESH_INTERVAL = 600;
const DEBUG_PYTHON = 0;
const spawn = require("child_process").spawn;
let interval;

// start python simconnect server
var process = spawn('python', ["./python/src/api.py"]);

if (DEBUG_PYTHON) {
  process.stdout.on('data', function(data) {
    console.log(data.toString());
  } );
  process.stderr.on('data', function(data) {
    console.warn(data.toString());
  } );
}

// start express server
express.init();

// loop to read variables
setTimeout(updateVars, REFRESH_INTERVAL);

function updateVars() {
  axios.get('http://localhost:8080/fcu').then(res => {
    arduino.setHeading(res.data.AUTOPILOT_HEADING_SELECTED || ' ');
    arduino.setSpeed(res.data.AUTOPILOT_SPEED_SELECTED || ' ');
  }).catch(err => {
    console.log('Error: ', err.message);
  });
  if(!process.killed) {
    setTimeout(updateVars, REFRESH_INTERVAL);
  }
}