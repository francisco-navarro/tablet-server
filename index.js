const arduino = require('./node/api/arduino.js');
const express = require('./node/express.js');
const axios = require('axios');
const debounce = require('debounce');


const REFRESH_INTERVAL = 5000;

const ENABLE_ARDUINO = false;



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