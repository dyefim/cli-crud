const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const {
  getNewQuery,
  getListQuery,
  getDoneQuery,
  getDeleteQuery,
} = require('./queries');

const argv = yargs(hideBin(process.argv)).argv;

const controller = () => {
  if (argv.new) {
    return getNewQuery();
  }

  if (argv.list) {
    return getListQuery();
  }

  if (argv.done) {
    return getDoneQuery();
  }

  if (argv.delete) {
    return getDeleteQuery();
  }

  throw new Error('Invalid input');
};

module.exports = controller;
