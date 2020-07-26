
'use strict';

const expect = require('chai').expect;
const algorithm = require('../dist/index');

describe('moonlight-algorithm function add test', () => {
  it('should return 2', () => {
    const result = algorithm.add(1, 1);
    expect(result).to.equal(2);
  });
});
