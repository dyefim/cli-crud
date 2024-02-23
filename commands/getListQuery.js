const argv = require('../args');

const getListQuery = () => {
  let query = `
    SELECT id, name, done, tags::text[]
    FROM list`;

  if (argv.tags) {
    query += ` WHERE tags::text[] && ARRAY[${argv.tags.map(
      (a) => "'" + a + "'"
    )}]::text[]`;
  }

  switch (argv.list) {
    case 'pending':
      return [query + ' done = false'];

    case 'done':
      return [query + ' done = true'];

    default:
      return [query];
  }
};

module.exports = getListQuery;
