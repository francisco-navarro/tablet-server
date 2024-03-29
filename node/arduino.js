var five = require("johnny-five");
const tm1637 = require('./tm1637.js');
const { ARDUINO_FCU_DISPLAYS } = require('../configuration.js');


let cache = {};
let speed, heading;
let i = 1;

try {

  
  var board = new five.Board({
    port: ARDUINO_FCU_DISPLAYS.PORT
  });

  board.on("ready", function () {
    console.log('Started arduino displays on ' + ARDUINO_FCU_DISPLAYS.PORT);

    speed = tm1637({
      clk: ARDUINO_FCU_DISPLAYS.SPEED_PINS.clk,
      dio: ARDUINO_FCU_DISPLAYS.SPEED_PINS.dio,
      board: board
    });
    heading = speed;
    heading = tm1637({
      clk: ARDUINO_FCU_DISPLAYS.HEADING_PINS.clk,
      dio: ARDUINO_FCU_DISPLAYS.HEADING_PINS.dio,
      board: board
    });

    speed.show("----");
    heading.show("----");


  });

function pad(num = 0, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
    return num;
}


} catch (err) {
  console.warn("Problema arrancando arduino!")
  console.warn(err);
}

module.exports = {
  setHeading: (n) => {
    
    if (heading && cache.heading !== n) {
      cache.heading = n;
      heading.show(' '+ pad(cache.heading,3 ));
    }
    
  },
  setSpeed:(n) => {
    if (speed && cache.speed !== n) {
      cache.speed = n;
      speed.show(' '+ pad(cache.speed,3 ));
    }
    
  },
}