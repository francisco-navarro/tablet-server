var five = require("johnny-five");
const tm1637 = require('./tm1637.js');
const { ARDUINO_FCU_DISPLAYS } = require('../configuration.js');
let i =0;
let speedDisplay;

try {
  var board = new five.Board({
    port: ARDUINO_FCU_DISPLAYS.PORT
  });

  board.on("ready", function () {
    console.log('Started arduino displays on ' + ARDUINO_FCU_DISPLAYS.PORT);
    const speedDisplay = tm1637({
      clk: ARDUINO_FCU_DISPLAYS.SPEED_PINS.clk,
      dio: ARDUINO_FCU_DISPLAYS.SPEED_PINS.dio,
      board: board
    });

    speedDisplay.show("    ");

    board.repl.inject({
      speedDisplay
    });

    // para pruebas
    board.loop(300, () => {
      speedDisplay.show(" " + (i++));
    });

  });
} catch (ex) {
  console.log('Error arduino on ' + ARDUINO_FCU_DISPLAYS.PORT);
  console.error(ex);
}
