
'use strict';

const expect = require('chai').expect;
const algorithm = require('../dist/index');

describe('moonlight-algorithm function bubbleSort test', () => {
  it('should return [1, 1, 2, 3, 6, 7, 8]', () => {
    const result = algorithm.bubbleSort([3, 6, 8, 7, 2, 1, 1]);
    // expect(JSON.stringify(result)).to.equal(JSON.stringify([1, 1, 2, 3, 6, 7, 8]));
    expect(result.toString()).to.equal([1, 1, 2, 3, 6, 7, 8].toString());
  });
});

describe('moonlight-algorithm function quickSort1 test', () => {
  it('should return [1, 1, 2, 3, 6, 7, 8]', () => {
    const result = algorithm.quickSort1([3, 6, 8, 7, 2, 1, 1]);
    expect(result.toString()).to.equal([1, 1, 2, 3, 6, 7, 8].toString());
  });
});

describe('moonlight-algorithm function quickSort2 test', () => {
  it('should return [1, 1, 2, 3, 6, 7, 8]', () => {
    const result = algorithm.quickSort2([3, 6, 8, 7, 2, 1, 1], 0, 6);
    expect(result.toString()).to.equal([1, 1, 2, 3, 6, 7, 8].toString());
  });
});
