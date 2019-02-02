const word_to_number = require('./word-to-number');

module.exports = {

  buy(special) {
    return this.extactNumbericValue(special, 'buy');
  },

  get(special) {
    return this.extactNumbericValue(special, 'get');
  },

  discount(special) {
    let matches = special.match(/([0-9+]{1,3}% off|half|free)/);
    if(matches) {
      let x = matches[1];
      switch (x) {
        case "half":
          return 0.5;
        case "free":
          return 1.0;
        default:
          return Number(x.replace('% off','')) / 100;
      }
    } else {
      return 0.0;
    }
  },

  limit(special) {
    return this.extactNumbericValue(special, 'limit');
  },

  extactNumbericValue(special, key) {

    // Match numeric value; i.e. 1, 2, etc.
    let matches_number = special.match(new RegExp(`${key} ([0-9]+)`));
    if(matches_number) {
      return Number(matches_number[1]);
    }

    // Match string values; i.e. one, two, etc.
    let matches_string = special.match(new RegExp(`${key} ([A-z]+)`));
    if(matches_string) {
      return word_to_number(matches_string[1]);
    }

    return undefined;
  },

};
