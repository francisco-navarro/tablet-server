const simConnect = require('msfs-simconnect-nodejs');


// ----------------


require('./vjoy.js');



console.log("Trying to connect...")



var success = simConnect.open("MyAppName", function(name, version) {
    console.log("\n-----------------------------\nConnected to: " + name + "\nSimConnect version: " + version + "\n-----");

    // simConnect.requestDataOnSimObjectType([
    //     ["NAV IDENT:1", null, simConnect.datatype.STRINGV],
    //     ["NAV NAME:1", null, simConnect.datatype.STRINGV],
    //     ["NAV DME:1","Nautical miles"],
    // ], (data) => {
    //     console.log(data);
    // }, 0 /* radius=0 */, 
    // simConnect.simobjectType.USER,
    // simConnect.period.SIM_FRAME,            // Get data every sim frame...
    // simConnect.dataRequestFlag.CHANGED      // ...but only if one of the variables have changed
    // );

    simConnect.requestDataOnSimObject([
        ["Plane Latitude", "degrees"],
        ["Plane Longitude", "degrees"],  
        ["PLANE ALTITUDE", "feet"],
        ["A32NX_ECAM_SD_CURRENT_PAGE_INDEX", null, 1]

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