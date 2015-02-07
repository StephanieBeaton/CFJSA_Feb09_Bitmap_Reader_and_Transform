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

function PaletteObj () {
  this.red;
  this.blue;
  this.green;
  this.alpha;
};

// References
//
// (1.) Wikipedia article about BMP file format
//    https://en.wikipedia.org/wiki/BMP_file_format
//
// (2.) Buffer class --
//     http://nodejs.org/api/buffer.html
//

var fs = require('fs');
// bitmap is a Buffer
var bitmap = fs.readFileSync('test.bmp');

var bitmapObject = {};

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
bitmapObject.palettes      = [];

// bitmapObject --
//{ type: 'BM',
//  fileSize: 11078,
//  startOfPixels: 1078,
//  dibHeaderSize: 40,   // this tells us the DIB header type
//  width: 100,
//  height: 100,
//  colorDepth: 8,       // 8-bit color (2 to the 8 = 256 colors)
//  paletteSize: 256,
//  colorSpaceType: 9393723,


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
   palette.blue  = 0;
   palette.green = 0;
   palette.red   = 100;

   bitmapObject.palettes.push(palette);

}


//bitmapObject.pixels = [];

// -----------------------------------------------------
// find out how many values there are in the pixel table
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


console.dir(bitmapObject);

console.log(bitmapObject.palettes.length);

// -----------------------------------------------------
// Transform the pallet
// -----------------------------------------------------

// -----------------------------------------------------
// Print out new bitmap file
// -----------------------------------------------------

// first copy original buffer into new buffer

/* colorDepth
A typical computer monitor and video card may offer 8 bits of color precision
 (256 output levels) per R/G/B color channel,
 for an overall 24-bit color space (or 32-bit space,
 with alpha transparency bits,
 which have little bearing on the color precision)
*/

// http://nodejs.org/api/fs.html  fs module
// bitmap reference --
// https://docs.nodejitsu.com/articles/advanced/buffers/how-to-use-buffers
// buffer.copy(target, targetStart=0, sourceStart=0, sourceEnd=buffer.length);
console.log("bitmapObject.fileSize" + bitmapObject.fileSize);
var bitmap_new = new Buffer(bitmapObject.fileSize);
bitmap.copy(bitmap_new, 0);

// copy the new pallet table from the bitmapObject to the new buffer

console.log("bitmapObject.palettes.length = " + bitmapObject.palettes.length);
console.log("paletteOffset = " + paletteOffset);

for (var i = 0; i < bitmapObject.palettes.length; i += 1) {

   console.log("inside loop");
   console.log("i = " + i);

   var palette   = bitmapObject.palettes[i];

   var x;
   x = paletteOffset + (i * 4);
   console.log("blue offset = " + x);
   console.log("palette.blue = " + palette.blue);
   bitmap_new.writeUInt8(palette.blue,  x);

   x = paletteOffset + (i * 4) + 1;
   console.log("green offset = " + x);
   console.log("palette.green = " + palette.green);
   bitmap_new.writeUInt8(palette.green, x);

   x = paletteOffset + (i * 4) + 2;
   console.log("red offset = " + x);
   console.log("palette.red = " + palette.red);
   bitmap_new.writeUInt8(palette.red,   x);

   x = paletteOffset + (i * 4) + 3;
   console.log("alpha offset = " + x);
   console.log("palette.alpha = " + palette.alpha);

   bitmap_new.writeUInt8(palette.alpha, x);
}

// write the buffer to a file

/*
fs.writeFile(filename, data, [options], callback)#
filename String
data String | Buffer
options Object
encoding String | Null default = 'utf8'
mode Number default = 438 (aka 0666 in Octal)
flag String default = 'w'
callback Function
Asynchronously writes data to a file, replacing the file if it already exists. data can be a string or a buffer.

The encoding option is ignored if data is a buffer. It defaults to 'utf8'.

Example:

fs.writeFile('message.txt', 'Hello Node', function (err) {
  if (err) throw err;
  console.log('It\'s saved!');
});
*/
var options = {
  encoding:  'utf8',
  mode: 438,
  flag: 'w'
};

fs.writeFileSync('transformed.bmp', bitmap_new);




