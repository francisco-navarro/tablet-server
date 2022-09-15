const simConnect = require('msfs-simconnect-nodejs');


// ----------------


require('./vjoy.js');



console.log("Trying to connect...")



var success = simConnect.open("MyAppName", function(name, version) {
    console.log("\n-----------------------------------------------\nConnected to: " + name + "\nSimConnect version: " + version + "\n-----------------------------------------------");
           

});

