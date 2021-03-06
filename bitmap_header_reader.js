'use strict';

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


// Buffer class --
// http://nodejs.org/api/buffer.html
var bitmapObject = {};

bitmapObject.type          = bitmap.toString('utf-8', 0, 2);
bitmapObject.size          = bitmap.readInt32LE(2);
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
//  size: 11078,
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

   /*
   if ( !(palette.blue == 0 && palette.green == 0 && palette.red == 0)) {
     palette.blue   = 100;
     palette.green  = 0;
     palette.red    = 0;
   }
   */

   bitmapObject.palettes.push(palette);

   //  experiment -- write the file out

   bitmap.writeUInt8(100,           paletteOffset + i)
   bitmap.writeUInt8(0,             paletteOffset + i + 1)
   bitmap.writeUInt8(0,             paletteOffset + i + 1)
   bitmap.writeUInt8(palette.alpha, paletteOffset + i + 1)

}


//bitmapObject.pixels = [];

// work in progress
bitmapObject.uniqueOffsetsIntoPallete = {};
var pixel;

for (var i = 0; i < 10000; i++) {
  pixel = bitmap.readUInt8(bitmapObject.startOfPixels + i);
  if (!bitmapObject.uniqueOffsetsIntoPallete[pixel] ) {
    bitmapObject.uniqueOffsetsIntoPallete[pixel] = true;
  }
}

console.dir(bitmapObject);

for(var propertyName in bitmapObject.uniqueOffsetsIntoPallete) {
  console.log(propertyName);

  console.log(bitmapObject.palettes[propertyName]);
}


console.log(bitmapObject.palettes.length);

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
var bitmap_copy = new Buffer(bitmapObject.size);
bitmap.copy(bitmap_copy, 0);

// transform the pallet

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
}

fs.writeFileSync('transformed.bmp', bitmap_copy);




