module.exports = function (price, markdown = 0.0, discount = 0.0) {
  let cost = (price - markdown) * (1 - discount);
  return Math.floor(cost * 100) / 100;
};
