const {
  getNewQuery,
  getListQuery,
  getDoneQuery,
  getDeleteQuery,
} = require('./queries');

const argv = require('./args');

const controller = () => {
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

module.exports = controller;
