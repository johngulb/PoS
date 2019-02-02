module.exports = {

  items: {

  },

  add(attrs) {
    this.items[attrs.upc] = attrs;
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
