const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;


describe('Inventory', () => {

  context('add item to inventory', () => {
    it('should be stored in inventory', () => {
      assert(0);
    })
  })

  context('remove item from inventory', () => {
    it('should no longer be in inventory', () => {
      assert(0);
    })
  })

  context('modify inventory item price', () => {
    it('should update item price', () => {
      assert(0);
    })
  })

  context('modify inventory item special', () => {
    it('should update item special', () => {
      assert(0);
    })
  })

  context('modify inventory item markdown', () => {
    it('should update item markdown', () => {
      assert(0);
    })
  })

  context('add item with invalid price to inventory', () => {
    it('should return error when price is less than $0', () => {
      assert(0);
    })

    it('should return error when price is not of type "number"', () => {
      assert(0);
    })

    it('should return error when price has more than two decimal points', () => {
      assert(0);
    })
  })

  context('add invalid markdown to item in inventory', () => {
    it('should return error when markdown is less than $0', () => {
      assert(0);
    })

    it('should return error when markdown is not of type "number"', () => {
      assert(0);
    })

    it('should return error when markdown has more than two decimal points', () => {
      assert(0);
    })
  })

  context('add invalid special to item in inventory', () => {
    it('should return error', () => {
      assert(0);
    })
  })

});
