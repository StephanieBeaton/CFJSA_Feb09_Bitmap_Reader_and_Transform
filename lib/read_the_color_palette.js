'use strict';

var readColorPalette = exports = module.exports = {}; // jshint ignore:line

var greeting = 'read_color_palette';

readColorPalette.readPalette = function(bitmap,bitmapObject) {

  function PaletteObj () {
    this.red   = 0;
    this.blue  = 0;
    this.green = 0;
    this.alpha = 0;
  }

  bitmapObject.palettes = [];

  var paletteOffset = 54;

  // read in 4 bytes 256 times (paletteSize)
  for (var i = 0; i < (bitmapObject.paletteSize * 4); i += 4) {

     var palette   = new PaletteObj();

     // color order is on page 4 of 9 of the BMP file format article
     // also page 5 of 9 top says
     // .. The colors in the color table are usually specified
     // .. in the 4-byte per entry RGBA32 format
     //
     // http://en.wikipedia.org/wiki/RGBA_color_space#RGBA_byte_order
     //  The bytes are stored in memory on a little-endian machine
     //  ... in the order A,B,G,R.

     palette.blue  = bitmap.readUInt8(paletteOffset + i);
     palette.green = bitmap.readUInt8(paletteOffset + i + 1);
     palette.red   = bitmap.readUInt8(paletteOffset + i + 2);
     palette.alpha = bitmap.readUInt8(paletteOffset + i + 3);

     // experiment
     /*
     palette.blue  = 0;
     palette.green = 0;
     palette.red   = 100;
     */

     bitmapObject.palettes.push(palette);

  }

  console.log("in  lib/read_the_color_header.js");
  console.dir(bitmapObject);

  //return greeting;
  return bitmapObject;
};
