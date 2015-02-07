var expect = require("chai").expect;
var openBitmapFile = require("../lib/open_bitmap_file.js");
var readFileHeader = require("../lib/read_file_header.js");

describe("readFileHeader readHeader()", function(){
  it("should read in the data to bitmapObject", function () {
    var bitmapObject = {};
    var bitmapFileName = 'test.bmp';

    var bitmap = openBitmapFile.openFile(bitmapFileName);
    var results = readFileHeader.readHeader(bitmap,bitmapObject);

    var testBitmapObject = {
      type: 'BM',
      fileSize: 11078,
      startOfPixels: 1078,
      dibHeaderSize: 40,   // this tells us the DIB header type
      width: 100,
      height: 100,
      colorDepth: 8,       // 8-bit color (2 to the 8 = 256 colors)
      imageSize: 0,
      paletteSize: 256,
      colorSpaceType: 9393723
    };

    expect(results).to.deep.equal(testBitmapObject);
  });

});
