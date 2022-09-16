try {

  const simConnect = require('msfs-simconnect-nodejs');

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
} catch(ex) {
  console.error(ex);
}