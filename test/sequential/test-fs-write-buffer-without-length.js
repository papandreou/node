'use strict';
const common = require('../common');
const assert = require('assert');
const path = require('path');
const Buffer = require('buffer').Buffer;
const fs = require('fs');
const filename = path.join(common.tmpDir, 'write.txt');

common.refreshTmpDir();

fs.open(filename, 'w', 0o644, common.mustCall(function(err, fd) {
  if (err) throw err;

  var cb = common.mustCall(function(err, written) {
    if (err) throw err;

    assert.equal(2, written);
    fs.closeSync(fd);

    var found = fs.readFileSync(filename, 'utf8');
    assert.deepStrictEqual('lo', found);
    fs.unlinkSync(filename);
  });

  fs.write(fd, Buffer.from('hello'), 3, cb);
}));
