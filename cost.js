module.exports = function (price, markdown = 0.0, discount = 0.0) {
  let cost = (price - markdown) * (1 - discount);
  // console.log(`(price(${price}) - markdown(${markdown})) * (1 - discount(${discount})) = ${cost}'`);
  return Math.floor(cost * 100) / 100;
};
