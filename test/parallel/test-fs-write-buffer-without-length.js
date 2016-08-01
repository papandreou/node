'use strict';
const common = require('../common');
const assert = require('assert');
const path = require('path');
const Buffer = require('buffer').Buffer;
const fs = require('fs');
const filename = path.join(common.tmpDir, 'write.txt');

common.refreshTmpDir();

fs.open(filename, 'w', 0o644, common.mustCall(function(err, fd) {
  assert.ifError(err);

  const cb = common.mustCall(function(err, written) {
    assert.ifError(err);

    assert.strictEqual(2, written);
    fs.closeSync(fd);

    const found = fs.readFileSync(filename, 'utf8');
    assert.deepStrictEqual('lo', found);
    fs.unlinkSync(filename);
  });

  fs.write(fd, Buffer.from('hello'), 3, cb);
}));
