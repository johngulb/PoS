const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;


describe('Inventory', () => {

  let inventory;

  beforeEach(() => {
    inventory = require('../inventory');
    inventory.add({
      upc: 'apple',
      price: 0.99,
      per: 'pound',
      markdown: 0.00,
    })
  })

  context('add item to inventory', () => {
    it('should be stored in inventory', () => {
      let item = inventory.lookup('apple');
      expect(item).to.be.a('object');
    })
  })

  context('remove item from inventory', () => {
    it('should no longer be in inventory', () => {
      inventory.remove('apple');
      let item = inventory.lookup('apple');
      expect(item).to.be.undefined;
    })
  })

  context('modify inventory item price', () => {
    it('should update valid item price', () => {
      inventory.update('apple', 'price', 1.19);
      let item = inventory.lookup('apple');
      expect(item.price).to.be.a('number');
      expect(item.price).to.equal(1.19);
      expect(item.price > 0).to.equal(true);
    })
  })

  context('modify inventory item special', () => {
    it('should update item special', () => {
      let updated_special = 'buy 1 get 1 free';
      inventory.update('apple', 'special', updated_special);
      let item = inventory.lookup('apple');
      expect(item.special).to.be.a('string');
      expect(item.special).to.equal(updated_special);
    })
  })

  context('modify inventory item markdown', () => {
    it('should be a valid item markdown', () => {
      let updated_markdown = 0.19;
      inventory.update('apple', 'markdown', updated_markdown);
      let item = inventory.lookup('apple');
      expect(item.markdown).to.be.a('number');
      expect(item.markdown).to.equal(updated_markdown);
    })
  })

  // context('add item with invalid price to inventory', () => {
  //   it('should return error when price is less than $0', () => {
  //     assert(0);
  //   })
  //
  //   it('should return error when price is not of type "number"', () => {
  //     assert(0);
  //   })
  //
  //   it('should return error when price has more than two decimal points', () => {
  //     assert(0);
  //   })
  // })
  //
  // context('add invalid markdown to item in inventory', () => {
  //   it('should return error when markdown is less than $0', () => {
  //     assert(0);
  //   })
  //
  //   it('should return error when markdown is not of type "number"', () => {
  //     assert(0);
  //   })
  //
  //   it('should return error when markdown has more than two decimal points', () => {
  //     assert(0);
  //   })
  // })
  //
  // context('add invalid special to item in inventory', () => {
  //   it('should return error', () => {
  //     assert(0);
  //   })
  // })

});
