var events = require("events");

var CAR = function(five, opts) {
  var car = this;
  if (opts.pin) {
    car.pin = five.Pin({
      pin: opts.pin
    });
    car.pin.state = "low";

    /*car.pin.on("high", function(){
			console.log("PIN IS HIGH", arguments);
		});

		car.pin.on("low", function(){
			console.log("PIN IS LOW", arguments);
		});

		car.pin.on("data", function(){
			console.log("PIN DATA EVENT", arguments);
		});*/

  }
}

CAR.prototype = events.EventEmitter.prototype;

CAR.prototype.fidelity = 1000;
CAR.prototype.pin = undefined;
CAR.prototype.isOn = false;
CAR.prototype.speedData = {
  rate: 0,
  minHigh: 30,
  minLow: 10,
  highs: 0,
  lows: 0
}

CAR.prototype.engine = function() {
  var car = this;
  if (car.isOn) {
    //console.log("ENGINE");
    var currentRate = (car.fidelity / (car.speedData.highs + car.speedData.lows)) * car.speedData.highs;
    if (currentRate <= car.speedData.rate) {
      if (car.pin.state != "high") {
        car.pin.high();
        car.pin.state = "high";
      }
      car.speedData.highs += car.speedData.minHigh;
      setTimeout(function() {
        car.engine();
      }, car.speedData.minHigh);
    } else {
      if (car.pin.state != "low") {
        car.pin.low();
        car.pin.state = "low";
      }
      car.speedData.lows += car.speedData.minLow;
      setTimeout(function() {
        car.engine();
      }, car.speedData.minLow);
    }

    //stop memory leaks
    if (car.speedData.highs + car.speedData.lows > car.fidelity * 2) {
      car.speedData.highs = car.speedData.highs / car.fidelity;
      car.speedData.lows = car.speedData.lows / car.fidelity;
    }
  } else {
    car.pin.low();
  }
}

CAR.prototype.start = function() {
  var car = this;
  car.isOn = true;
  car.engine();
}

CAR.prototype.stop = function() {
  var car = this;
  car.isOn = false;
  car.pin.low();
}

CAR.prototype.setSpeed = function(opts) {
  var car = this;

  car.speedData.rate = opts.rate || car.speedData.rate;
  car.speedData.minHigh = opts.minHigh || car.speedData.minHigh;
  car.speedData.minLow = opts.minLow || car.speedData.minLow;
  car.speedData.lows = 0;
  car.speedData.highs = 0;

  car.emit("speed-change", car.speedData);
}

module.exports = CAR;