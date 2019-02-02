const Inventory = require('./inventory');
const Special = require('./special');
const cost = require('./cost');

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
    let subtotal = 0;

    // Item is on special
    if(group.item.special) {

      // force special text to lower, to easily ignore casing
      let special = group.item.special.toLowerCase();

      if(group.item.per === 'unit') {
        // per unit specials
        let matches = null;
        // "Buy N get M %X off"
        if((matches = special.match(/buy ([0-9+]) get ([0-9+]) ([0-9+]{1,3}%|half|free)( off)?/))) {
          let n = Number(matches[1]), m = Number(matches[2]), x = matches[3];
          let extra = group.size % (n + m);
          let on_special = group.size - extra;
          let regular = on_special / (n + m) * n + extra;
          let discounted = on_special / (n + m) * m;
          let pct = Special.parsePercent(x);
          subtotal = regular * cost(group.item.price, group.item.markdown) + discounted * cost(group.item.price, group.item.markdown, pct);
        }
      } else if(group.item.per === 'pound') {
        // per pound specials
      }
    } else {
      // no special
      subtotal = (group.item.price - group.item.markdown) * group.size;
    }

    // round final cost to two decimals
    return cost(subtotal);
  },

  total() {

  },

  clear() {
    this.items = {};
  }

};
