var stdin = process.openStdin(); 
require('tty').setRawMode(true);    

var SlotCarSet = require("node-slot-car-bot");

var MySlotCarSet = new SlotCarSet();

MySlotCarSet.on("ready", function(){

	var Yoshi = MySlotCarSet.addCar({pin:6});

	stdin.on('keypress', function (chunk, key) {
	  if (key && key.ctrl && key.name == 'c'){
	  	Yoshi.pin.low();
	  	process.exit();
	  }
	  else if(key && key.name == 's'){
	  	var rate = Yoshi.speedData.rate - 30;
	  	if(rate<0){
	  		rate = 0;
	  	}
	  	Yoshi.setSpeed({rate:rate});
	  }
	  else if(key && key.name == 'w'){
	  	var rate = Yoshi.speedData.rate + 30;
	  	if(rate>Yoshi.fidelity){
	  		rate = Yoshi.fidelity;
	  	}
	  	Yoshi.setSpeed({rate:rate});
	  }
	  else if(key && key.name == 'space'){
	  	if(Yoshi.isOn){
	  		console.log("STOP THIS CAR");
	  		Yoshi.stop();
	  	}
	  	else{
	  		console.log("START THIS CAR");
	  		Yoshi.start();
	  	}
	  }
	});
});
