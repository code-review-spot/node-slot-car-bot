var events = require("events");
var five = require("johnny-five");
var cars = require("./lib/cars");
var carTypes = Object.keys(cars);

var SLOT_CAR_SET = function(opts) {
  var slotCarSet = this;
  slotCarSet.board = new five.Board();

  slotCarSet.board.on("error", function() {
    console.log("ERROR", arguments);
  });

  slotCarSet.board.on("ready", function() {
    slotCarSet.emit("ready");
    slotCarSet.isReady = true;
  });
}

SLOT_CAR_SET.prototype = events.EventEmitter.prototype;

SLOT_CAR_SET.prototype.cars = [];
SLOT_CAR_SET.prototype.board = undefined;
SLOT_CAR_SET.prototype.isReady = false;

SLOT_CAR_SET.prototype.addCar = function(opts) {
  var slotCarSet = this;

  opts.type = opts.type || "digital";

  opts.type = opts.type.toLowerCase();
  if (opts.pin && carTypes.indexOf(opts.type) != -1) {
    var car = new cars[opts.type](five, opts);
    slotCarSet.cars.push(car);
    return car;
  } else {
    throw Error("PIN IS REQUIRED WHEN CREATING A CAR");
  }
}

module.exports = SLOT_CAR_SET;