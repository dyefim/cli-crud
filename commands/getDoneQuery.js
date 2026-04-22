const { DATE_STYLE } = require('../utils');

const getDoneQuery = (argv) => {
  const queryText = `
    UPDATE list
    SET done = true
    WHERE id = $1
    RETURNING id, name, done, ${DATE_STYLE};`;

  const values = [argv.done];

  return [queryText, values];
};

module.exports = getDoneQuery;
