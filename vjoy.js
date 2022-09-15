const { vJoy, vJoyDevice } = require('vjoy');

if (!vJoy.isEnabled()) {
	console.log("vJoy is not enabled.");
	process.exit();
}

let device = vJoyDevice.create(1);

device.buttons[1].set(true);

console.log('prueba');

device.buttons[1].set(false);