const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;

const controller = () => {
  if (argv.list) {
    return ['SELECT name, done FROM list'];
  }

  if (argv.new) {
    const queryText = `
      INSERT into list(name)
      VALUES($1)
      RETURNING *`;

    const values = [argv.new];

    return [queryText, values];
  }

  throw new Error('Invalid input');
};

module.exports = controller;
