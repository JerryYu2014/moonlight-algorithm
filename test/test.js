
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

describe('moonlight-algorithm function _2DArraySearch test', () => {
  it('should return true', () => {
    const result = algorithm._2DArraySearch(4, [[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    expect(result).to.equal(true);
  });
});

describe('moonlight-algorithm function binarySearch test', () => {
  it('should return 2', () => {
    const result = algorithm.binarySearch(5, [1, 3, 5, 7, 8, 9], 0, 5);
    expect(result).to.equal(2);
  });
});
