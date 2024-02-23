const {
  getNewQuery,
  getListQuery,
  getDoneQuery,
  getDeleteQuery,
} = require('./commands');

const argv = require('./args');

const buildQuery = () => {
  if (argv.new) {
    return getNewQuery();
  }

  if (argv.done) {
    return getDoneQuery();
  }

  if (argv.delete) {
    return getDeleteQuery();
  }

  return getListQuery();
};

module.exports = { buildQuery };
