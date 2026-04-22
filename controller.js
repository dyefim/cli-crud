const {
  getNewQuery,
  getListQuery,
  getDoneQuery,
  getDeleteQuery,
} = require("./commands");

const buildQuery = (argv) => {
  if (argv.new) {
    return getNewQuery(argv);
  }

  if (argv.done) {
    return getDoneQuery(argv);
  }

  if (argv.delete) {
    return getDeleteQuery(argv);
  }

  return getListQuery(argv);
};

module.exports = { buildQuery };
