const Inventory = require('./inventory');
const Special = require('./special');
const cost = require('./cost');

module.exports = {

  items: {},

  add(upc, count = 1, weight = 0.0) {
    item = Inventory.lookup(upc);
    if(item.per === 'pound') {
      if(!this.items[upc]) {
        this.items[upc] = {
          item: item,
          count: 0,
          weights : []
        };
      }
      this.items[upc].weights.push(weight);
      this.items[upc].count = this.items[upc].weights.length;
    }else if(item.per === 'unit') {
      if(!this.items[upc]) {
        this.items[upc] = {
          item: item,
          count: 0
        };
      }
      this.items[upc].count += count;
    }
  },

  remove(upc, weight = 0.0) {
    item = Inventory.lookup(upc);
    if(item.per === 'pound') {
      let weights = this.items[upc].weights;
      let i = weights.indexOf(weight);
      weights.spice(i, 1);
      this.items[upc].count = this.items[upc].weights.length;
    } else {
      if(this.items[upc].count > 0) {
        this.items[upc].count -= count;
      }
    }
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

      let percent_discount = Special.discount(special);
      let limit = Special.limit(special);
      let over_limit = limit && group.count > limit;
      let apply_to = over_limit ? limit : group.count;

      if(group.item.per === 'unit') {
        // per unit specials
        let matches = null;

        if(Special.isBuyGet(special)) {
          // number to buy that triggers special
          let buy_count = Special.buyCount(special);
          // number the special applies to
          let get_count = Special.getCount(special);
          // determine number items that do not apply to special
          let extra = apply_to % (buy_count + get_count);
          // Add the extra item over the limit
          if(over_limit)
            extra += group.count - limit;
          // number of items to apply the special
          let on_special = group.count - extra;
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
          // discounted price
          let discounted_price = Special.forEachPrice(special);
          // determine number items that do not apply to special
          let extra = group.count - apply_to;
          subtotal = apply_to * discounted_price + extra * group.item.price;
        }
      } else if(group.item.per === 'pound') {
        // per pound specials
        if(Special.isBuyGet(special)) {
          // number to buy that triggers special
          let buy_count = Special.buyCount(special);
          // number the special applies to
          let get_count = Special.getCount(special);

          // sort weights, by highest first to ensure the most expensive items are bought at regular price
          let weights = group.weights.slice();
          weights.sort().reverse();

          // console.log(`BUY: ${buy_count} GET: ${get_count} DISCOUNT: ${percent_discount} WEIGHTS: `, weights);

          let bought = 0;
          // pop off the number of items until we git the buy count
          while (weights.length) {
            let buy_weight = weights.shift();
            subtotal += buy_weight * cost(group.item.price, group.item.markdown);
            bought++;
            // once we hit the buy count, start tallying items at discount
            if(buy_count === bought && get_count) {
              let get = 0;
              while (weights.length) {
                let get_weight = weights.shift();
                subtotal += get_weight * cost(group.item.price, group.item.markdown, percent_discount);
                if(get === get_count) {
                  break;
                }
              }
            }
          }
        }
      }
    } else {
      // no special
      if(group.item.per === 'unit') {
        subtotal = (group.item.price - group.item.markdown) * group.count;
      } else if(group.item.per === 'pound') {
        subtotal = (group.item.price - group.item.markdown) * group.weights.reduce((acc, i) => acc + i);
      }
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
