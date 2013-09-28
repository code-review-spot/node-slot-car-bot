var stdin = process.openStdin(); 
require('tty').setRawMode(true);    

var track = require("./index");


var GrandPre = new track();

GrandPre.on("ready", function(){

	var Yoshi = GrandPre.addCar({pin:6});    

	var laps = [];

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
	  		Yoshi.stop();
	  		console.log(laps);
	  		laps = [];
	  	}
	  	else{
	  		Yoshi.start();
	  	}
	  }
	  else if(key && key.name == "l"){
	  	var time = Date.now();
	  	if(laps.length!=0){
	  		var last = laps[laps.length-1];
	  		last.end = time;
	  		last.time = (last.end - last.start)/1000;
	  		laps[laps.length] = last;
	  	}

	  	laps.push({
	  		start: time
	  	});
	  }
	  else{
	  	console.log("KEY PRESS:", key.name);
	  }
	});
});
