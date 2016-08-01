'use strict';
const common = require('../common');
const assert = require('assert');
const path = require('path');
const Buffer = require('buffer').Buffer;
const fs = require('fs');
const filename = path.join(common.tmpDir, 'write.txt');
const expected = Buffer.from('hello');

common.refreshTmpDir();

fs.open(filename, 'w', 0o644, common.mustCall(function(err, fd) {
  assert.ifError(err);

  const cb = common.mustCall(function(err, written) {
    assert.ifError(err);

    assert.strictEqual(expected.length, written);
    fs.closeSync(fd);

    var found = fs.readFileSync(filename, 'utf8');
    assert.deepStrictEqual(expected.toString(), found);
  });

  fs.write(fd, expected, 0, expected.length, null, cb);
}));
