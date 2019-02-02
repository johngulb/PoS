const Inventory = require('./inventory');

module.exports = {

  items: {

  },

  add(upc, value = 1) {
    if(!this.items[upc]) {
      this.items[upc] = {value: 0};
    }
    this.items[upc].value += value;
  },

  remove(upc, value = 1) {
    if(!this.items[upc]) {
      this.items[upc] = {value: 0};
    }
    this.items[upc].value -= value;
  },

  lookup(upc) {
    return this.items[upc];
  },

  subtotal(upc) {

  },

  total() {

  },

};
