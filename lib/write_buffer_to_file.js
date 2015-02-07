'use strict';

var fs = require('fs');

var writeBufferToFile = exports = module.exports = {}; // jshint ignore:line

var greeting = 'write_buffer_to_file';

writeBufferToFile.writeFile = function(bitmap_new) {

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

  var message = "success";

  return message;
};
