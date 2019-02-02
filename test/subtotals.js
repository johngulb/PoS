const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;

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
      order.add('apple', 1);
      let subtotal = order.subtotal('apple');
      expect(subtotal).to.equal(0.99);
    })

    it('2.5 lbs of apples should cost $2.47 (floor beyond second decimal, i.e. not $2.475)', () => {
      order.add('apple', 2.5);
      let subtotal = order.subtotal('apple');
      expect(subtotal).to.equal(2.47);
    })

  })

  context('apples at $0.99/lb with $0.10 markdown', () => {

    it('1 lb apples should cost $0.89', () => {
      inventory.update('apple', 'markdown', 0.10);
      order.add('apple', 1);
      let subtotal = order.subtotal('apple');
      expect(subtotal).to.equal(0.89);
    })

    it('2.5 lbs of apples should cost $2.22', () => {
      inventory.update('apple', 'markdown', 0.10);
      order.add('apple', 2.5);
      let subtotal = order.subtotal('apple');
      expect(subtotal).to.equal(2.22);
    })

  })

})

// describe('Calculate items subtotal', () => {
//
//   context('per unit with markdown subtotal', () => {
//     it('TODO: add test case', () => {
//       assert(0);
//     })
//   })
//
//   context('by weight with markdown subtotal', () => {
//     it('TODO: add test case', () => {
//       assert(0);
//     })
//   })
//
//   context('item with markdown subtotal', () => {
//     it('TODO: add test case', () => {
//       assert(0);
//     })
//   })
//
//   context('item on special subtotal', () => {
//     it('TODO: add test case', () => {
//       assert(0);
//     })
//   })
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
