const num_words = require('num-words')

module.exports = function (word, limit = 100) {
  let i = 0;
  while(i < limit) {
    if(num_words(i) === word) {
      return i;
    }
    i++;
  }
  return undefined;
};
