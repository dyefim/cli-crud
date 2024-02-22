const table = require('text-table');

const formatTable = (rows) =>
  table(
    rows.map((row) =>
      Object.entries(row).map(([key, value]) => {
        if (key === 'id') {
          return '# ' + value;
        }

        if (key === 'tags') {
          return value ? `[${value.join(', ')}]` : '';
        }

        if (key === 'done') {
          return value ? '[x]' : '[ ]';
        }

        return value;
      })
    )
  );

module.exports = { formatTable };
