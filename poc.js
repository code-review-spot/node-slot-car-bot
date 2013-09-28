var five = require("johnny-five");

var board = new five.Board();

var sss;

board.on("ready", function() {
  

	var SLOT_CAR = function(pin){
		var car = this;
		car.pin = pin;
		car.speed = 0;
		car.on = false;
		car.highs = 0;
		car.lows = 0;
		car.delays = {
			high: 30,
			low: 10
		};
	}

	SLOT_CAR.prototype.engine = function() {
		var car = this;
		if(car.on){
			var avg = (1000/(car.highs+car.lows))*car.highs;
			if(avg<=car.speed){
				car.pin.high();
				car.highs+=car.delays.high;
				setTimeout(function(){
					car.engine();
				}, car.delays.high)
			}
			else{
				car.pin.low();
				car.lows+=car.delays.low;
				setTimeout(function(){
					car.engine();
				}, car.delays.low)
			}

		}
		else{
			car.pin.low();
		}
	};

	SLOT_CAR.prototype.setSpeed = function(speed){
		var car = this;
		car.speed = speed > 1000 ? 1000 : (speed < 0 ? 0 : speed);
		car.highs = 0;
		car.lows = 0;
	}

	SLOT_CAR.prototype.start = function(){
		var car = this;
		car.on = true;
		car.engine();
	}

	SLOT_CAR.prototype.stop = function(){
		var car = this;
		car.on = false;
	}

	sss = new five.Pin({pin:6});

	var Yoshi = new SLOT_CAR(sss);

	Yoshi.start();
	Yoshi.setSpeed(500);

	var driver = function(){
		var avg = (1000/(Yoshi.highs+Yoshi.lows))*Yoshi.highs;
		console.log("SPEED: ", Yoshi.speed, "RATE:", avg);
		if(Yoshi.speed==1000){
			Yoshi.stop();
		}
		else{
			setTimeout(driver, 1000);
			Yoshi.setSpeed(500);
		}
	}

	driver();

});
