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
      let special = group.item.special.toLowerCase().replace(',','');

      if(group.item.per === 'unit') {
        // per unit specials
        let matches = null;
        let percent_discount = Special.discount(special);
        let limit = Special.limit(special);
        // "Buy N get M"
        if(Special.isBuyGet(special)) {
          let buy_count = Special.buyCount(special);
          let get_count = Special.getCount(special);
          let over_limit = limit && group.size > limit;
          let apply_to = over_limit ? limit : group.size;
          let extra = apply_to % (buy_count + get_count);
          // Add the extra item over the limit
          if(over_limit)
            extra += group.size - limit;
          // number of items to apply the special
          let on_special = group.size - extra;
          // number of regular price items
          let num_regular_items = on_special / (buy_count + get_count) * buy_count + extra;
          // number of discounted items
          let num_discounted_items = on_special / (buy_count + get_count) * get_count;
          // cost of regular items
          let regular_cost = num_regular_items * cost(group.item.price, group.item.markdown);
          // cost of discounted items
          let discounted_cost = num_discounted_items * cost(group.item.price, group.item.markdown, percent_discount);
          subtotal = regular_cost + discounted_cost;
        } else if(Special.isForEach(special)) {
          let discounted_price = Special.forEachPrice(special);
          let over_limit = limit && group.size > limit;
          let apply_to = over_limit ? limit : group.size;
          let extra = group.size - apply_to;
          subtotal = apply_to * discounted_price + extra * group.item.price;
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
