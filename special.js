module.exports = {

  extract(special) {

  },

  parsePercent(x) {
    switch (x) {
      case "half":
        return 0.5;
      case "free":
        return 1.0;
      default:
        return Number(x.replace('%','')) / 100;
    }
  }

};
