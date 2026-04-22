const { DATE_STYLE } = require('../utils');

const getNewQuery = (argv) => {
  const queryText = `
    INSERT into list(name, tags)
    VALUES($1, $2)
    RETURNING id, name, done, ${DATE_STYLE};`;

  const values = [
    Array.isArray(argv.new) ? argv.new.join(' ') : argv.new,
    argv.tags,
  ];

  return [queryText, values];
};

module.exports = getNewQuery;
