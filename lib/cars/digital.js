var events = require("events");

var CAR = function(opts){
	var car = this;
	if(opts.pin){
		car.pin = opts.pin;
	}
}

CAR.prototype = events.EventEmitter.prototype;

CAR.prototype.pin = undefined;
CAR.prototype.isOn = false;
CAR.prototype.speedData = {
	rate: 0,
	minHigh: 0,
	minLow: 0
}

module.exports = CAR;
