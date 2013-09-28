var stdin = process.openStdin(); 
require('tty').setRawMode(true);    

var SlotCarSet = require("node-slot-car-bot");

var MySlotCarSet = new SlotCarSet();

MySlotCarSet.on("ready", function(){

	var Yoshi = MySlotCarSet.addCar({pin:6});

	var updateDisplay = function(){
		process.stdout.write('\u001B[2J\u001B[0;0f');
		console.log("Car is", Yoshi.isOn ? "on" : "off");
		console.log("Engine", Yoshi.isOn ? "are" : "will be", "at", (100/Yoshi.fidelity)*Yoshi.speedData.rate, "%");
		console.log("Press SPACE to", Yoshi.isOn ? "START" : "STOP", "the car");
		console.log("Press UP ARROW to increase speed");
		console.log("Press DOWN ARROW to decrease speed");
		console.log("Prese CTRL+C to quit");
	}

	Yoshi.on("speed-change", function(data){
		updateDisplay();
	});

	stdin.on('keypress', function (chunk, key) {
	  if (key && key.ctrl && key.name == 'c'){
	  	Yoshi.pin.low();
	  	process.exit();
	  }
	  else if(key && key.name == 'down'){
	  	var rate = Yoshi.speedData.rate - 30;
	  	if(rate<0){
	  		rate = 0;
	  	}
	  	Yoshi.setSpeed({rate:rate});
	  }
	  else if(key && key.name == 'up'){
	  	var rate = Yoshi.speedData.rate + 30;
	  	if(rate>Yoshi.fidelity){
	  		rate = Yoshi.fidelity;
	  	}
	  	Yoshi.setSpeed({rate:rate});
	  }
	  else if(key && key.name == 'space'){
	  	if(Yoshi.isOn){
	  		Yoshi.stop();
	  		updateDisplay();
	  	}
	  	else{
	  		Yoshi.start();
	  		updateDisplay();
	  	}
	  }
	  else{
	  	updateDisplay();
	  }
	});

	updateDisplay();
});
