const Inventory = require('./inventory');
const Special = require('./special');
const cost = require('./cost');

module.exports = {

  items: {},

  add(upc, count = 1, weight = 0.0) {
    item = Inventory.lookup(upc);
    if (item.per === 'pound') {
      if (!this.items[upc]) {
        this.items[upc] = {
          item: item,
          count: 0,
          weights: []
        };
      }
      this.items[upc].weights.push(weight);
      this.items[upc].count = this.items[upc].weights.length;
    } else if (item.per === 'unit') {
      if (!this.items[upc]) {
        this.items[upc] = {
          item: item,
          count: 0
        };
      }
      this.items[upc].count += count;
    }

    // Update items subtotal
    this.items[upc].subtotal = this.subtotal(upc);
  },

  remove(upc, weight = 0.0) {
    item = Inventory.lookup(upc);
    if (item.per === 'pound') {
      let weights = this.items[upc].weights;
      let i = weights.indexOf(weight);
      weights.spice(i, 1);
      this.items[upc].count = this.items[upc].weights.length;
    } else {
      if (this.items[upc].count > 0) {
        this.items[upc].count -= count;
      }
    }

    // Update items subtotal
    this.items[upc].subtotal = this.subtotal(upc);
  },

  lookup(upc) {
    return this.items[upc];
  },

  subtotal(upc) {
    let group = this.items[upc];
    let subtotal = 0;

    // Item is on special
    if (group.item.special) {

      // force special text to lower, to easily ignore casing
      let special = group.item.special.toLowerCase().replace(',', '');

      let percent_discount = Special.discount(special);
      let limit = Special.limit(special);
      let over_limit = limit && group.count > limit;
      let apply_to = over_limit ? limit : group.count;

      if (group.item.per === 'unit') {
        // per unit specials
        let matches = null;

        if (Special.isBuyGet(special)) {

          // number to buy that triggers special
          let buy_count = Special.buyCount(special);

          // number the special applies to
          let get_count = Special.getCount(special);

          // determine number items that do not apply to special
          let extra = apply_to % (buy_count + get_count);

          // Add the extra item over the limit
          if (over_limit)
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
        } else if (Special.isForEach(special)) {

          // discounted price
          let discounted_price = Special.forEachPrice(special);

          // determine number items that do not apply to special
          let extra = group.count - apply_to;
          subtotal = apply_to * discounted_price + extra * group.item.price;

        }
      } else if (group.item.per === 'pound') {
        // per pound specials
        if (Special.isBuyGet(special)) {
          // number to buy that triggers special
          let buy_count = Special.buyCount(special);
          // number the special applies to
          let get_count = Special.getCount(special);

          // sort weights, by highest first to ensure the most expensive items are bought at regular price
          let weights = group.weights.slice();
          weights.sort().reverse();

          // initialize values to keep track of when to apply discount
          let bought_full_price = 0,
            purchased = 0;

          // pop off the number of items until we git the buy count
          while (weights.length) {

            // get the next items weight
            let buy_weight = weights.shift();

            // add full price item to subtotal
            subtotal += cost(buy_weight * cost(group.item.price, group.item.markdown));
            bought_full_price++;
            purchased++;

            // determine if we are at the limit for discounted purchases
            let at_limit = limit && purchased >= limit;

            // once we hit the buy count, start tallying items at discount
            if (!at_limit && buy_count === bought_full_price && get_count) {

              // to keep track of the number of items bought at discount
              let bought_discounted_price = 0;

              while (weights.length) {

                // get the next items weight
                let get_weight = weights.shift();

                // add discounted item to subtotal
                let discount_price = cost(get_weight * cost(group.item.price, group.item.markdown, percent_discount));
                subtotal += discount_price;
                bought_discounted_price++;
                purchased++;

                // once we purchase the number of items we get at a discount, start paying full price again
                if (bought_discounted_price === get_count) {
                  bought_full_price = 0;
                  break;
                }
              }
            }
          }
        }
      }
    } else {
      // no special
      if (group.item.per === 'unit') {
        subtotal = (group.item.price - group.item.markdown) * group.count;
      } else if (group.item.per === 'pound') {
        subtotal = (group.item.price - group.item.markdown) * group.weights.reduce((acc, i) => acc + i);
      }
    }

    // round final cost to two decimals
    return cost(subtotal);
  },

  total() {
    let total = 0;
    for (var upc in this.items) {
      if (this.items.hasOwnProperty(upc)) {
        total += this.items[upc].subtotal;
      }
    }
    return total;
  },

  clear() {
    this.items = {};
  }

};
