const Inventory = require('./inventory');

module.exports = {

  items: {},

  add(upc, size = 1) {
    if(!this.items[upc]) {
      item = Inventory.lookup(upc);
      this.items[upc] = {
        size: 0,
        item: item,
      };
    }
    this.items[upc].size += size;
  },

  remove(upc, size = 1) {
    if(!this.items[upc]) {
      this.items[upc] = {size: 0};
    }
    this.items[upc].size -= size;
  },

  lookup(upc) {
    return this.items[upc];
  },

  subtotal(upc) {
    let group = this.items[upc];
    return Math.floor(((group.item.price - group.item.markdown) * group.size) * 100) / 100;
  },

  total() {

  },

  clear() {
    this.items = {};
  }

};
