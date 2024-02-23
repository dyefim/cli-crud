const argv = require('../args');
const { DATE_STYLE } = require('../utils');

const getDeleteQuery = () => {
  const queryText = `
    DELETE FROM list
    WHERE id = $1
    RETURNING id, name, done, ${DATE_STYLE};`;

  const values = [argv.delete];

  return [queryText, values];
};

module.exports = getDeleteQuery;
