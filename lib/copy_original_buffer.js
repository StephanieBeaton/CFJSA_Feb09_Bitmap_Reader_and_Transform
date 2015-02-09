'use strict';

var copyOriginalBuffer = exports = module.exports = {}; // jshint ignore:line

var greeting = 'copy_original_buffer';

copyOriginalBuffer.copyBuffer = function(bitmap, bitmapObject) {
  // first copy original buffer into new buffer

  // http://nodejs.org/api/fs.html  fs module
  // bitmap reference --
  // https://docs.nodejitsu.com/articles/advanced/buffers/how-to-use-buffers
  // buffer.copy(target, targetStart=0, sourceStart=0, sourceEnd=buffer.length);
  //console.log("bitmapObject.fileSize" + bitmapObject.fileSize);
  var bitmap_new = new Buffer(bitmapObject.fileSize);
  bitmap.copy(bitmap_new, 0);

  //return greeting;
  return bitmap_new;
};
