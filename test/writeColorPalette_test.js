var expect = require("chai").expect;
var openBitmapFile = require("../lib/open_bitmap_file.js");
var readFileHeader = require("../lib/read_file_header.js");
var readColorPalette = require("../lib/read_the_color_palette");
var transformColorPalette = require("../lib/transform_the_color_palette.js");
var writeColorPalette = require("../lib/write_color_palette_to_buffer.js");

describe("writeColorPalette writePalette()", function(){
  it("should write the palette data into the new bitmap buffer", function () {
    var bitmapObject = {};
    var bitmapFileName = 'test.bmp';

    var bitmap = openBitmapFile.openFile(bitmapFileName);
    bitmapObject = readFileHeader.readHeader(bitmap, bitmapObject);

    bitmapObject = readColorPalette.readPalette(bitmap,bitmapObject);

    bitmapObject = transformColorPalette.transformPalette(bitmapObject);

    var resultsBitmap = writeColorPalette.writePalette(bitmap, bitmapObject);

    // read in data in "expected.bmp" file into "expectedBitmap" buffer
    // ... and compare with "resultsBitmap"
    var expectedBitmap = openBitmapFile.openFile('expected.bmp');

    expect(resultsBitmap.toString('base64')).to.deep.equal(expectedBitmap.toString('base64'));
  });

});
