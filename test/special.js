const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
const Special = require('../special');

describe('Extract specials attributes', () => {

  context('Buy N get M', () => {

    it('buy 1 get 1 free', () => {
      let special = 'buy 1 get 1 free';
      expect(Special.isBuyGet(special)).to.equal(true);
      expect(Special.buyCount(special)).to.equal(1);
      expect(Special.getCount(special)).to.equal(1);
      expect(Special.limit(special)).to.equal(undefined);
    })

    it('buy 2 get 1 free', () => {
      let special = 'buy 2 get 1 free';
      expect(Special.isBuyGet(special)).to.equal(true);
      expect(Special.buyCount(special)).to.equal(2);
      expect(Special.getCount(special)).to.equal(1);
      expect(Special.limit(special)).to.equal(undefined);
    })

    it('buy 1 get 1 50% off', () => {
      let special = 'buy 1 get 1 50% off';
      expect(Special.isBuyGet(special)).to.equal(true);
      expect(Special.buyCount(special)).to.equal(1);
      expect(Special.getCount(special)).to.equal(1);
      expect(Special.limit(special)).to.equal(undefined);
    })

    it('buy 1 get 1 half off', () => {
      let special = 'buy 1 get 1 half off';
      expect(Special.isBuyGet(special)).to.equal(true);
      expect(Special.buyCount(special)).to.equal(1);
      expect(Special.getCount(special)).to.equal(1);
      expect(Special.limit(special)).to.equal(undefined);
    })

    it('buy 2 get 1 free, limit 6', () => {
      let special = 'buy 2 get 1 free, limit 6';
      expect(Special.isBuyGet(special)).to.equal(true);
      expect(Special.buyCount(special)).to.equal(2);
      expect(Special.getCount(special)).to.equal(1);
      expect(Special.limit(special)).to.equal(6);
    })

    it('buy two get one free, limit six', () => {
      let special = 'buy two get one free, limit six';
      expect(Special.isBuyGet(special)).to.equal(true);
      expect(Special.buyCount(special)).to.equal(2);
      expect(Special.getCount(special)).to.equal(1);
      expect(Special.limit(special)).to.equal(6);
    })

    it('buy two get one half off, limit six', () => {
      let special = 'buy two get one half off, limit six';
      expect(Special.isBuyGet(special)).to.equal(true);
      expect(Special.buyCount(special)).to.equal(2);
      expect(Special.getCount(special)).to.equal(1);
      expect(Special.limit(special)).to.equal(6);
    })

  })

  context('N for $X', () => {

    it('4 for $8', () => {
      let special = "4 for $8";
      expect(Special.isForEach(special)).to.equal(true);
      expect(Special.forEachPrice(special)).to.equal(2.0);
    })

    it('4 for $8.00', () => {
      let special = "4 for $8.00";
      expect(Special.isForEach(special)).to.equal(true);
      expect(Special.forEachPrice(special)).to.equal(2.0);
    })

    it('four for $8.00', () => {
      let special = "four for $8.00";
      expect(Special.isForEach(special)).to.equal(true);
      expect(Special.forEachPrice(special)).to.equal(2.0);
    })

  })

});
