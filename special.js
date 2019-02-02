module.exports = {

  extract(special) {
    
  },

  parsePercent(x) {
    return (x === "half" ? 0.5 : (Number(x.replace('%','')) / 100));
  }

};
