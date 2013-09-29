# Node Slot Car Bot

Automate your Slotcar Set with Javascript

## Usage

For detailed intructions see [the write up on Will Robots Dream](http://www.willrobotsdream.com/node-slot-car-bot/).

1. `NPM install node-slot-car-bot`
2. Create a control script
```
var SlotCarSet = require("node-slot-car-bot");

var MySet = new SlotCarSet();

MySet.on("ready", function(){
	var mySet = this;
	var car = mySet.addCar({pin:6});
	car.setSpeed({rate:300});
	car.start();
});
```

## Examples

See the examples folder.