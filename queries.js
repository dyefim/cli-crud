const argv = require('./args');

const DATE_STYLE = "TO_CHAR(created_at, 'Mon dd HH12:MI')";

const getNewQuery = () => {
  const queryText = `
    INSERT into list(name, tags)
    VALUES($1, $2)
    RETURNING id, name, done, ${DATE_STYLE};`;

  const values = [argv.new, argv.tags];

  return [queryText, values];
};

const getListQuery = () => {
  const baseQuery = 'SELECT id, name, done, tags::text[] FROM list';

  switch (argv.list) {
    case 'pending':
      return [baseQuery + ' WHERE done = false'];

    case 'done':
      return [baseQuery + ' WHERE done = true'];

    default:
      return [baseQuery];
  }
};

const getDoneQuery = () => {
  const queryText = `
    UPDATE list
    SET done = true
    WHERE id = $1
    RETURNING id, name, done, ${DATE_STYLE};`;

  const values = [argv.done];

  return [queryText, values];
};

const getDeleteQuery = () => {
  const queryText = `
    DELETE FROM list
    WHERE id = $1
    RETURNING id, name, done, ${DATE_STYLE};`;

  const values = [argv.delete];

  return [queryText, values];
};

module.exports = { getNewQuery, getListQuery, getDoneQuery, getDeleteQuery };
