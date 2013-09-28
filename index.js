var events = require("events");
var five = require("johnny-five");
var cars = require("./lib/cars");
var carTypes = Object.keys(cars);

var TRACK = function(opts){
	var track = this;
	track.board = new five.Board();

	track.board.on("error", function(){
		console.log("ERROR", arguments);
	});

	track.board.on("ready", function(){
		track.emit("ready");
		track.isReady = true;
	});
}

TRACK.prototype = events.EventEmitter.prototype;

TRACK.prototype.cars = [];
TRACK.prototype.board = undefined;
TRACK.prototype.isReady = false;

TRACK.prototype.addCar = function(opts){
	var track = this;

	opts.type = opts.type || "digital";

	opts.type = opts.type.toLowerCase();
	if(opts.pin && carTypes.indexOf(opts.type)!=-1){
		var car = new cars[opts.type](five, opts);
		track.cars.push(car);
		return car;
	}
	else{
		throw Error("PIN IS REQUIRED WHEN CREATING A CAR");
	}
}

module.exports = TRACK;