'use strict';

/* ---------------------------------------------------------------
Tyler email Thu Feb 5, 2015 7:30pm

Transform doesn't have to be a callback if you're doing everything sync
 but it should be a function that you can drop in.
 Essentially your program should be able to theoretically take
 multiple different transform functions without having to do more work
 than transform(bitmapObject) or transform(buffer).
 Your index.js file
 or bitmap.js file should really just coordinate that work that needs
 to be done. All of the "work" should be abstracted into functions
 that will reside in lib/.
 Essentially your main file should
  open the bitmap file,
  send to a function to read the header,
  send it to a function to read the palette,
  send it to a function that transforms the palette, etc.
// ------------------------------------------------------------------
*/


// -----------------------------------------------------------------
// References
//
// (1.) Wikipedia article about BMP file format
//    https://en.wikipedia.org/wiki/BMP_file_format
//
// (2.) Buffer class --
//     http://nodejs.org/api/buffer.html
// -----------------------------------------------------------------

var openBitmapFile     = require('./lib/open_bitmap_file.js');
var readFileHeader     = require('./lib/read_file_header.js');
var readColorPalette   = require('./lib/read_the_color_palette.js');
var transformColorPalette = require('./lib/transform_the_color_palette.js');
var copyOriginalBuffer = require('./lib/copy_original_buffer.js');
var writeColorPalette  = require('./lib/write_color_palette_to_buffer.js');
var writeBufferToFile  = require('./lib/write_buffer_to_file.js');


var app = function(input) {
  var name = input || process.argv[2] || 'anonymous';

  console.log(name);

  var result;
  var bitmapFileName = 'test.bmp';

  var bitmap = openBitmapFile.openFile(bitmapFileName);
  console.log("called openBitmapFile");

  var bitmapObject = {};
  //  no test for this because it is essentially a node function
  bitmapObject = readFileHeader.readHeader(bitmap,bitmapObject);
  console.log("called readFileHeader");

  bitmapObject = readColorPalette.readPalette(bitmap,bitmapObject);
  console.dir(bitmapObject.palletes);
  console.log("called readPalette");

  bitmapObject = transformColorPalette.transformPalette(bitmapObject);
  console.log("called transformColorPalette");

 //  no test for this because it is essentially a node function
   var bitmap_new = copyOriginalBuffer.copyBuffer(bitmap, bitmapObject);
  console.log("called copyOriginalBuffer");

  bitmap_new = writeColorPalette.writePalette(bitmap_new, bitmapObject);
  console.log("called writeColorPalette");

  //  no test for this because it is essentially a node function
  result = writeBufferToFile.writeFile(bitmap_new);
  console.log("called writeBufferToFile");
  console.log(result);

  // -----------------------------------------------------
  // find out how many values there are in the pixel table
  // -----------------------------------------------------
  bitmapObject.uniqueOffsetsIntoPallete = {};
  var pixel;

  for (var i = 0; i < 10000; i++) {
    pixel = bitmap.readUInt8(bitmapObject.startOfPixels + i);
    if (!bitmapObject.uniqueOffsetsIntoPallete[pixel] ) {
      bitmapObject.uniqueOffsetsIntoPallete[pixel] = true;
    }
  }


  for(var propertyName in bitmapObject.uniqueOffsetsIntoPallete) {
    console.log(propertyName);

    console.log(bitmapObject.palettes[propertyName]);
  }
  // end of "find out how many values there are in the pixel table"
  // -----------------------------------------------------

  console.log(bitmapObject.palettes.length);

  return result;
};

app();

module.exports = app;
