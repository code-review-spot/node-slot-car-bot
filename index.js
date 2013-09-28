var events = require("events");
var five = require("johnny-five");

var TRACK = function(opts){
	var track = this;
	track.board = new five.Board();
	track.board.on("ready", function(){
		track.emit("ready");
	});
}

TRACK.prototype = events.EventEmitter.prototype;

TRACK.prototype.cars = [];
TRACK.prototype.board = undefined;

TRACK.prototype.addCar = function(opts){
	var track = this;
	if(opts.pin){
		opts.pin = five.Pin({pin:opts.pin});
		track.cars.push(new )
	}
	else{
		throw Error("PIN IS REQUIRED WHEN CREATING A CAR");
	}
}

module.exports = TRACK;