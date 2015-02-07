'use strict';

// --------------------------------------------------------------------------
// Ideas for easy transformations:
//
//  * invert the colors (essentially subtract every color value from
//    ... the max color value which is 255),
//
//  * Grayscale the colors, multiply each color value by a constant,
//    ... just make sure your values don't go over 255.
//
//  * (red|green|blue)scale the colors, same as above but only multiply
//    ... one of the colors.
// --------------------------------------------------------------------------

var transformColorPalette = exports = module.exports = {}; // jshint ignore:line

var greeting = 'transform_color_palette';

transformColorPalette.transformPalette = function(bitmapObject) {

  var paletteOffset = 54;

  var palette;

  // read in 4 bytes 256 times (paletteSize)
  for (var i = 0; i < (bitmapObject.paletteSize); i += 1) {

    palette   = bitmapObject.palettes[i];

    /*  quick and dirty transform
    palette.blue  = 100;
    palette.green = 0;
    palette.red   = 0;
    */

    // Invert the colors (essentially subtract every color value from
    // ... the max color value which is 255),
    palette.blue  = 255 - palette.blue;
    palette.green = 255 - palette.green;
    palette.red   = 255 - palette.red;

  }

  console.log("in  lib/transform_color_palette.js")
  console.dir(bitmapObject);

  //return greeting;
  return bitmapObject;
};
