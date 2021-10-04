const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.prettier,
  trailingComma: 'none',
  endOfLine: 'auto'
};
