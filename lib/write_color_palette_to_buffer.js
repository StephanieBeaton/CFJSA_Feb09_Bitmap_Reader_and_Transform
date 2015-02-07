'use strict';

var writeColorPalette = exports = module.exports = {}; // jshint ignore:line

var greeting = 'write_color_palette_to_buffer';

var paletteOffset = 54;


writeColorPalette.writePalette = function(bitmap_new, bitmapObject) {

  // copy the new pallet table from the bitmapObject to the new buffer

  //console.log("bitmapObject.palettes.length = " + bitmapObject.palettes.length);
  //console.log("paletteOffset = " + paletteOffset);

  for (var i = 0; i < bitmapObject.palettes.length; i += 1) {

     //console.log("inside loop");
     //console.log("i = " + i);

     var palette   = bitmapObject.palettes[i];

     var x;
     x = paletteOffset + (i * 4);
     //console.log("blue offset = " + x);
     //console.log("palette.blue = " + palette.blue);
     bitmap_new.writeUInt8(palette.blue,  paletteOffset + (i * 4));

     x = paletteOffset + (i * 4) + 1;
     //console.log("green offset = " + x);
     //console.log("palette.green = " + palette.green);
     bitmap_new.writeUInt8(palette.green, paletteOffset + (i * 4) + 1);

     x = paletteOffset + (i * 4) + 2;
     //console.log("red offset = " + x);
     //console.log("palette.red = " + palette.red);
     bitmap_new.writeUInt8(palette.red,   paletteOffset + (i * 4) + 2);

     x = paletteOffset + (i * 4) + 3;
     //console.log("alpha offset = " + x;
     //console.log("palette.alpha = " + palette.alpha);

     bitmap_new.writeUInt8(palette.alpha, paletteOffset + (i * 4) + 3);
  }

  //return greeting;
  return bitmap_new;
};
