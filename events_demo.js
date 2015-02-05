var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;
var fs = require('fs');

var MyEventEmitter = function() {};

inherits(MyEventEmitter, EventEmitter);

var myEventEmitter = new MyEventEmitter();

myEventEmitter.on('moreMagic', function() {
  console.log("You're a wizard Harry!");
});

myEventEmitter.on('magic', function(data) {
  console.log('data: ' + data.toString());
  this.emit('moreMagic');
});

fs.readFile(process.argv[2], function(unicorns, rainbows) {
  if (unicorns) throw unicorns;

  myEventEmitter.emit('magic', rainbows);
});

process.nextTick(function() {
  myEventEmitter.emit('moreMagic');
});

process.nextTick(function() {
  console.log('inside next tick');
});

console.log('first');
