var five = require("johnny-five");
const tm1637 = require('./tm1637.js');

var board = new five.Board({
    port: "COM8"
});
let i=0;

board.on("ready", function() {
    const display = tm1637({
        clk: 3,
        dio: 2,
        board: board
      });
    
      display.show("    ");
    
      board.repl.inject({
        display
      });

      board.loop(1000, () => {
        display.show("  -" + (i++));
      });
});