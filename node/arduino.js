var five = require("johnny-five");
const tm1637 = require('./tm1637.js');
const { ARDUINO_FCU_DISPLAYS } = require('../configuration.js');

let speed, heading;
let cache = {};

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
    heading = tm1637({
      clk: ARDUINO_FCU_DISPLAYS.HEADING_PINS.clk,
      dio: ARDUINO_FCU_DISPLAYS.HEADING_PINS.dio,
      board: board
    });

    speed.show("----");
    heading.show("----");

    board.repl.inject({
      speed
    });

    board.loop(500, () => {
      cache.heading && heading.show(' '+ pad(cache.heading,3 ));
      cache.speed && speed.show(' '+ pad(cache.speed,3 ));
    });

  });

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
    return num;
}

module.exports = {
  setHeading: (n) => {
    
      cache.heading = n;
     
    
  },
  setSpeed:(n) => {
   
      cache.speed = n;
    
  },
}