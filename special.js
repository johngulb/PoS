module.exports = {

  extract(special) {

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
    let matches = special.match(/limit ([0-9]+)/);
    return matches ? matches[1] : null;
  },

};
