let vjoy, vJoyDevice;
let device;

const BUTTONS = {
	'TO\nCONFIG': 1,
	ENG: 2,
	BLEED: 3,
	PRESS: 4,
	ELEC: 5,
	HYD: 6,
	FUEL: 7,
	APU: 8,
	COND: 9,
	DOOR: 10,
	WHEEL: 11,
	'F/CTL': 12,
	CLR: 13,
	STS: 14,
	RCL: 15
}

function init() {
	try {

		const lib = require('vjoy');

		vJoy = lib.vJoy;
		vJoyDevice = lib.vJoyDevice;

		if (!vJoy.isEnabled()) {
			console.log("vJoy is not enabled.");
		}

		device = vJoyDevice.create(1);	
	
	} catch (ex) {
		console.warn(ex);
	}
		
}

function prueba() {
	device.buttons[1].set(true);

	console.log('prueba');

	device.buttons[1].set(false);
}

function pushButton (txt) {
	const btn = BUTTONS[txt];

	if (btn) {
		console.log('[vjoy] '+ btn);
		if (device) {
			device.buttons[btn].set(true);
			setTimeout(() => device.buttons[btn].set(false), 300);
		} else {
			console.warn('[vjoy] error - no device')
		}
	}
}

module.exports = {
	init,
	prueba,
	pushButton
};