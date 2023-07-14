const arduino = require('./node/arduino.js');
const express = require('./node/express.js');
const axios = require('axios');
const debounce = require('debounce');


// require('events').EventEmitter.defaultMaxListeners = 45;


const REFRESH_INTERVAL = 5000;
const DEBUG_PYTHON = 1;
const ENABLE_ARDUINO = false;
const spawn = require("child_process").spawn;



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
// let myInterval = setTimeout(updateVars, REFRESH_INTERVAL);
if (ENABLE_ARDUINO) { 
  let debounceUpdateVars = debounce(updateVars, 100);

  setTimeout(debounceUpdateVars, REFRESH_INTERVAL);
}

function updateVars() {
  axios.get('http://localhost:8080/fcu').then(res => {
    console.log(`${res.data.AUTOPILOT_SPEED_SELECTED}-${res.data.AUTOPILOT_HEADING_SELECTED}-`);
    if (ENABLE_ARDUINO) {
      arduino.setHeading(res.data.AUTOPILOT_HEADING_SELECTED || ' ');
      arduino.setSpeed(res.data.AUTOPILOT_SPEED_SELECTED || ' ');
  
      if(process.killed) {
        console.warn('Python process killes');
      } else {
        setTimeout(debounceUpdateVars, REFRESH_INTERVAL);
      }
    }

  }).catch(err => {
    console.log('Error: ', err.message);
    setTimeout(debounceUpdateVars, REFRESH_INTERVAL);
  });
 
}