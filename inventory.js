module.exports = {

  items: {

  },

  add(attrs) {
    this.items[attrs.upc] = {
      upc: attrs.upc,
      price: Number(attrs.price),
      per: attrs.per,
      markdown: Number(attrs.markdown),
      special: attrs.special,
    };
  },

  update(upc, attr, value) {
    this.items[upc][attr] = value;
  },

  lookup(upc) {
    return this.items[upc];
  },

  remove(upc) {
    delete this.items[upc];
  },

};
