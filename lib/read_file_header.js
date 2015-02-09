'use strict';

var readFileHeader = exports = module.exports = {}; // jshint ignore:line

var greeting = 'read_file_header';

readFileHeader.readHeader = function(bitmap,bitmapObject) {

  bitmapObject.type          = bitmap.toString('utf-8', 0, 2);
  bitmapObject.fileSize      = bitmap.readInt32LE(2);
  bitmapObject.startOfPixels = bitmap.readInt32LE(10);
  bitmapObject.dibHeaderSize = bitmap.readInt32LE(14);

  bitmapObject.width         = bitmap.readInt32LE(18);
  bitmapObject.height        = bitmap.readInt32LE(22);
  // bits per Pixel in the Pixel section
  bitmapObject.colorDepth    = bitmap.readInt16LE(28);
  bitmapObject.imageSize     = bitmap.readInt16LE(30);
  //the number of colors in the color palette, or 0 to default to 2n
  bitmapObject.paletteSize   = bitmap.readInt32LE(46);
  bitmapObject.colorSpaceType = bitmap.readInt32LE(70);

  // bitmapObject --
  //{ type: 'BM',
  //  fileSize: 11078,
  //  startOfPixels: 1078,
  //  dibHeaderSize: 40,   // this tells us the DIB header type
  //  width: 100,
  //  height: 100,
  //  colorDepth: 8,       // 8-bit color (2 to the 8 = 256 colors)
  //  paletteSize: 256,
  //  colorSpaceType: 9393723
  //}

  console.log("in  lib/read_file_header.js");
  console.dir(bitmapObject);

  //return greeting;
  return bitmapObject;
};
