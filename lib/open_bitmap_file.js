'use strict';

var fs = require('fs');

var openBitmapFile = exports = module.exports = {}; // jshint ignore:line

var greeting = 'open_bitmap_file';

openBitmapFile.openFile = function(bitmapFileName) {
  // bitmap is a Buffer
  var bitmap = fs.readFileSync(bitmapFileName);
  //return greeting;
  return bitmap;
};
