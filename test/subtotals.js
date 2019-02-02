const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;


describe('Calculate item subtotals', () => {

  beforeEach(() => {
    inventory = require('../inventory');
    order = require('../order');
    order.clear();
    inventory.add({
      upc: 'apple',
      price: 0.99,
      per: 'pound',
      markdown: 0.00,
    });
  })

  context('by weight subtotal', () => {
    it('1 lb apples for $0.99 per pound should cost $0.99', () => {
      order.add('apple', 1);
      let subtotal = order.subtotal('apple');
      expect(subtotal).to.equal(0.99);
    })
    it('2.5 lbs of apples for $0.99 per pound should cost $2.47 (floor beyond second decimal, i.e. not $2.475)', () => {
      order.add('apple', 2.5);
      let subtotal = order.subtotal('apple');
      expect(subtotal).to.equal(2.47);
    })
  })

  context('per unit with markdown subtotal', () => {
    it('TODO: add test case', () => {
      assert(0);
    })
  })

  context('by weight with markdown subtotal', () => {
    it('TODO: add test case', () => {
      assert(0);
    })
  })

  context('item with markdown subtotal', () => {
    it('TODO: add test case', () => {
      assert(0);
    })
  })

  context('item on special subtotal', () => {
    it('TODO: add test case', () => {
      assert(0);
    })
  })

  context('apply special "Buy N items get M at %X off"', () => {
    it('only every .', () => {
      assert(0);
    })
  })

  context('apply special "N for $X"', () => {
    it('N items cost $X', () => {
      assert(0);
    })
    it('N+1 is normal price unless N=1', () => {
      assert(0);
    })
  })

  context('limit the number of times a special can be applied', () => {
    it('item', () => {
      assert(0);
    })
  })

  context('Buy N, get M of equal or lesser value for %X off', () => {
    it('TODO: add test case', () => {
      assert(0);
    })
  })

  context('item does not have a special', () => {
    it('the additional cost of each item is the same', () => {
      assert(0);
    })
  })

});
