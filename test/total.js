const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
const Special = require('../special');


describe('Calculate order totals', () => {

  beforeEach(() => {
    inventory = require('../inventory');
    order = require('../order');
    order.clear();
    inventory.add({
      upc: 'apple',
      price: 0.99,
      per: 'pound',
      markdown: 0.10,
    });
    inventory.add({
      upc: 'doritos',
      price: 3.99,
      per: 'unit',
      special: "4 for $8, limit 8",
      markdown: 0.00,
    });
    inventory.add({
      upc: 'steak',
      price: 6.99,
      per: 'pound',
      special: 'buy 1 get 1 of equal or lesser value for 50% off, limit 4',
      markdown: 0.00,
    });
  })

  it('1 dorito, 1lb apples, 1lb steak should cost $9.88', () => {
    order.add('doritos', 1);
    order.add('apple', 1, 1.0);
    order.add('steak', 1, 1.0);
    expect(order.total()).to.equal(9.88);
  })

  // buy 9 doritos, 8 @ $2.00 + 1 @ $3.99 = $19.99
  // buy 1.5lb apples, 1.5lb * ($0.99 - $0.10) = $1.33
  // buy 1lb & 1.5lb steaks, (1.5 * $6.99) + (1.0 * (floor($6.99 * 0.5))) = $13.97
  it('9 doritos, 1.5lb apples, 1lb & 1.5lb steaks should cost $35.29', () => {
    order.add('doritos', 9);
    order.add('apple', 1, 1.5);
    order.add('steak', 1, 1.0);
    order.add('steak', 1, 1.5);
    expect(order.total()).to.equal(35.29);
  })

})
