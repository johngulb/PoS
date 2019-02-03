const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
const Special = require('../special');


describe('Calculate eaches subtotal', () => {

  beforeEach(() => {
    inventory = require('../inventory');
    order = require('../order');
    order.clear();
    inventory.add({
      upc: 'doritos',
      price: 3.99,
      per: 'unit',
      markdown: 0.00,
    });
  })

  context('doritos at $3.99 each', () => {

    it('1 doritos should cost $3.99', () => {
      order.add('doritos', 1);
      let subtotal = order.subtotal('doritos');
      expect(subtotal).to.equal(3.99);
    })

    it('3 doritos should cost $11.97', () => {
      order.add('doritos', 3);
      let subtotal = order.subtotal('doritos');
      expect(subtotal).to.equal(11.97);
    })

  })

  context('doritos at $3.99 each with $1.00 markdown', () => {

    it('1 doritos should cost $2.99', () => {
      inventory.update('doritos', 'markdown', 1.00);
      order.add('doritos', 1);
      let subtotal = order.subtotal('doritos');
      expect(subtotal).to.equal(2.99);
    })

    it('3 doritos should cost $8.97', () => {
      inventory.update('doritos', 'markdown', 1.00);
      order.add('doritos', 3);
      let subtotal = order.subtotal('doritos');
      expect(subtotal).to.equal(8.97);
    })

  })

  context('doritos on special, buy 1 get 1 50% off', () => {

    it('buy 1 should cost regular price, $3.99', () => {
      inventory.update('doritos', 'special', 'buy 1 get 1 50% off');
      order.add('doritos', 1);
      let subtotal = order.subtotal('doritos');
      expect(subtotal).to.equal(3.99);
    })

    it('buy 2 should cost $5.98, $3.99 + $1.99', () => {
      inventory.update('doritos', 'special', 'buy 1 get 1 50% off');
      order.add('doritos', 2);
      let subtotal = order.subtotal('doritos');
      expect(subtotal).to.equal(5.98);
    })

    it('buy 3 should cost $9.97, 2 @ $3.99  + 1 @ $1.99', () => {
      inventory.update('doritos', 'special', 'buy 1 get 1 50% off');
      order.add('doritos', 3);
      let subtotal = order.subtotal('doritos');
      expect(subtotal).to.equal(9.97);
    })

    it('buy 4 should cost $11.96, 2 @ $3.99  + 2 @ $1.99', () => {
      inventory.update('doritos', 'special', 'buy 1 get 1 50% off');
      order.add('doritos', 4);
      let subtotal = order.subtotal('doritos');
      expect(subtotal).to.equal(11.96);
    })

    it('buy 2 should cost $5.98, $3.99 + $1.99, substitute half for %50', () => {
      inventory.update('doritos', 'special', 'buy 1 get 1 half off');
      order.add('doritos', 2);
      let subtotal = order.subtotal('doritos');
      expect(subtotal).to.equal(5.98);
    })

  })

  context('doritos on special, buy 1 get 1 free', () => {

    it('buy 1 should cost regular price, $3.99', () => {
      inventory.update('doritos', 'special', 'buy 1 get 1 free');
      order.add('doritos', 1);
      let subtotal = order.subtotal('doritos');
      expect(subtotal).to.equal(3.99);
    })

    it('buy 2 should cost $3.99, 1 @ $3.99 + 1 @ $0.00', () => {
      inventory.update('doritos', 'special', 'buy 1 get 1 free');
      order.add('doritos', 2);
      let subtotal = order.subtotal('doritos');
      expect(subtotal).to.equal(3.99);
    })

  })

  context('doritos on special, buy 1 get 1 free, limit 4', () => {

    it('buy 1 should cost $3.99, 1 @ $3.99', () => {
      inventory.update('doritos', 'special', 'buy 1 get 1 free, limit 4');
      order.add('doritos', 1);
      let subtotal = order.subtotal('doritos');
      expect(subtotal).to.equal(3.99);
    })

    it('buy 3 should cost $5.98, 2 @ $3.99 + 1 @ $0.00', () => {
      inventory.update('doritos', 'special', 'buy 1 get 1 free, limit 4');
      order.add('doritos', 3);
      let subtotal = order.subtotal('doritos');
      expect(subtotal).to.equal(7.98);
    })

    it('buy 4 should cost $5.98, 2 @ $3.99 + 2 @ $0.00', () => {
      inventory.update('doritos', 'special', 'buy 1 get 1 free, limit 4');
      order.add('doritos', 4);
      let subtotal = order.subtotal('doritos');
      expect(subtotal).to.equal(7.98);
    })

    it('buy 5 should cost $5.98, 3 @ $3.99 + 2 @ $0.00', () => {
      inventory.update('doritos', 'special', 'buy 1 get 1 free, limit 4');
      order.add('doritos', 5);
      let subtotal = order.subtotal('doritos');
      expect(subtotal).to.equal(11.97);
    })

    it('buy 6 should cost $15.96, 4 @ $3.99 + 2 @ $0.00', () => {
      inventory.update('doritos', 'special', 'buy 1 get 1 free, limit 4');
      order.add('doritos', 6);
      let subtotal = order.subtotal('doritos');
      expect(subtotal).to.equal(15.96);
    })

  })

  context('doritos on special w/ numerical values represented as a string, buy one get one free, limit four', () => {


    it('buy 1 should cost $3.99, 1 @ $3.99', () => {
      inventory.update('doritos', 'special', 'buy one get one free, limit four');
      order.add('doritos', 1);
      let subtotal = order.subtotal('doritos');
      expect(subtotal).to.equal(3.99);
    })

    it('buy 3 should cost $5.98, 2 @ $3.99 + 1 @ $0.00', () => {
      inventory.update('doritos', 'special', 'buy one get one free, limit four');
      order.add('doritos', 3);
      let subtotal = order.subtotal('doritos');
      expect(subtotal).to.equal(7.98);
    })

    it('buy 4 should cost $5.98, 2 @ $3.99 + 2 @ $0.00', () => {
      inventory.update('doritos', 'special', 'buy one get one free, limit four');
      order.add('doritos', 4);
      let subtotal = order.subtotal('doritos');
      expect(subtotal).to.equal(7.98);
    })

    it('buy 5 should cost $5.98, 3 @ $3.99 + 2 @ $0.00', () => {
      inventory.update('doritos', 'special', 'buy one get one free, limit four');
      order.add('doritos', 5);
      let subtotal = order.subtotal('doritos');
      expect(subtotal).to.equal(11.97);
    })

    it('buy 6 should cost $15.96, 4 @ $3.99 + 2 @ $0.00', () => {
      inventory.update('doritos', 'special', 'buy one get one free, limit four');
      order.add('doritos', 6);
      let subtotal = order.subtotal('doritos');
      expect(subtotal).to.equal(15.96);
    })

  })

  context('doritos on special, 4 for $8, limit 8', () => {

    it('buy 1, should cost $2.00, 1 @ $2.00', () => {
      let special = "4 for $8, limit 8";
      inventory.update('doritos', 'special', special);
      order.add('doritos', 1);
      let subtotal = order.subtotal('doritos');
      expect(subtotal).to.equal(2.00);
    })

    it('buy 3, should cost $6.00, 3 @ $2.00', () => {
      let special = "4 for $8, limit 8";
      inventory.update('doritos', 'special', special);
      order.add('doritos', 3);
      let subtotal = order.subtotal('doritos');
      expect(subtotal).to.equal(6.00);
    })

    it('buy 4, should cost $8.00, 4 @ $2.00', () => {
      let special = "4 for $8, limit 8";
      inventory.update('doritos', 'special', special);
      order.add('doritos', 4);
      let subtotal = order.subtotal('doritos');
      expect(subtotal).to.equal(8.00);
    })

    it('buy 9, should cost $11.99, 8 @ $2.00 + 1 @ $3.99', () => {
      let special = "4 for $8, limit 8";
      inventory.update('doritos', 'special', special);
      order.add('doritos', 9);
      let subtotal = order.subtotal('doritos');
      expect(subtotal).to.equal(19.99);
    })

  })

})


describe('Calculate item by weight subtotal', () => {

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

  context('apples at $0.99/lb', () => {

    it('1 lb apples should cost $0.99', () => {
      order.add('apple', 1, 1.0);
      let subtotal = order.subtotal('apple');
      expect(subtotal).to.equal(0.99);
    })

    it('2.5 lbs of apples should cost $2.47 (floor beyond second decimal, i.e. not $2.475)', () => {
      order.add('apple', 1, 2.5);
      let subtotal = order.subtotal('apple');
      expect(subtotal).to.equal(2.47);
    })

  })

  context('apples at $0.99/lb with $0.10 markdown', () => {

    it('1 lb apples should cost $0.89', () => {
      inventory.update('apple', 'markdown', 0.10);
      order.add('apple', 1, 1.0);
      let subtotal = order.subtotal('apple');
      expect(subtotal).to.equal(0.89);
    })

    it('2.5 lbs of apples should cost $2.22', () => {
      inventory.update('apple', 'markdown', 0.10);
      order.add('apple', 1, 2.5);
      let subtotal = order.subtotal('apple');
      expect(subtotal).to.equal(2.22);
    })

  })

})

describe('Calculate item by weight subtotal, specials', () => {

  let special = 'buy 1 get 1 of equal or lesser value for 50% off, limit 4';

  beforeEach(() => {
    inventory = require('../inventory');
    order = require('../order');
    order.clear();
    inventory.add({
      upc: 'steak',
      price: 6.99,
      per: 'pound',
      special: special,
      markdown: 0.00,
    });
  })

  context('buy 1 get 1 of equal or lesser value for 50% off, 4', () => {

    it('extacts correct values from special', () => {
      expect(Special.isBuyGet(special)).to.equal(true);
      expect(Special.buyCount(special)).to.equal(1);
      expect(Special.getCount(special)).to.equal(1);
      expect(Special.discount(special)).to.equal(0.5);
    })

    it('purchase 1 @ 1.5 lb should cost $10.48', () => {
      order.add('steak', 1, 1.5);
      let subtotal = order.subtotal('steak');
      expect(subtotal).to.equal(10.48);
    })

    it('purchase 1 @ 1.5 lb and 1 @ 1lb should cost $13.97', () => {
      order.add('steak', 1, 1.5);
      order.add('steak', 1, 1.0);
      let subtotal = order.subtotal('steak');
      expect(subtotal).to.equal(13.97);
    })

    it('purchase 1.5lb, 1.2lb, 1.3lb, 1.4lb, 1.1lb, 1lb should cost $43.29', () => {
      order.add('steak', 1, 1.5);
      order.add('steak', 1, 1.2);
      order.add('steak', 1, 1.3);
      order.add('steak', 1, 1.4);
      order.add('steak', 1, 1.1);
      order.add('steak', 1, 1.0);
      let subtotal = order.subtotal('steak');
      expect(subtotal).to.equal(43.29);
    })

  })

})


// describe('Calculate items subtotal', () => {
//
//   context('apply special "Buy N items get M at %X off"', () => {
//     it('only every .', () => {
//       assert(0);
//     })
//   })
//
//   context('apply special "N for $X"', () => {
//     it('N items cost $X', () => {
//       assert(0);
//     })
//     it('N+1 is normal price unless N=1', () => {
//       assert(0);
//     })
//   })
//
//   context('limit the number of times a special can be applied', () => {
//     it('item', () => {
//       assert(0);
//     })
//   })
//
//   context('Buy N, get M of equal or lesser value for %X off', () => {
//     it('TODO: add test case', () => {
//       assert(0);
//     })
//   })
//
//   context('item does not have a special', () => {
//     it('the additional cost of each item is the same', () => {
//       assert(0);
//     })
//   })
//
// });
