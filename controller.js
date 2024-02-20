const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;

const controller = () => {
  if (argv.list) {
    const baseQuery = 'SELECT name, done FROM list';

    switch (argv.list) {
      case 'pending':
        return [baseQuery + ' WHERE done = false'];

      case 'done ':
        return [baseQuery + ' WHERE done = true'];

      default:
        return [baseQuery];
    }
  }

  if (argv.new) {
    const queryText = `
      INSERT into list(name)
      VALUES($1)
      RETURNING *`;

    const values = [argv.new];

    return [queryText, values];
  }

  if (argv.done) {
    const queryText = `
      UPDATE list
      SET done = true
      WHERE id = $1`;

    const values = [argv.done];

    return [queryText, values];
  }

  throw new Error('Invalid input');
};

module.exports = controller;
