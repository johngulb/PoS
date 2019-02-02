const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;


describe('Scanner', () => {

  let inventory;
  let order;

  beforeEach(() => {
    inventory = require('../inventory');
    order = require('../order');
    inventory.add({
      upc: 'apple',
      price: 0.99,
      per: 'pound',
      markdown: 0.00,
      special: 'buy 1 get 1 free'
    });
  })

  context('add item', () => {
    it('should update order', () => {
      let weight = 0.5;
      order.add('apple', weight);
      let apples = order.lookup('apple');
      expect(apples.value).to.equal(weight);
    })
  })

  context('add item, not in inventory', () => {
    it('should return invalid item error', () => {
      assert(0);
    })
  })

  context('remove any item when no exisiting item scanned', () => {
    it('should return same total', () => {
      assert(0);
    })
  })

  context('remove item on special', () => {
    it('should invalidate special when removing 2nd item on "Buy 2 get 1 half off special."', () => {
      assert(0);
    })
  })

});
