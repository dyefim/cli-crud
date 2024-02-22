const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .usage('Usage: todo <command> [options]')
  .alias({
    new: ['a', 'add'],
    done: ['d', 'check'],
    delete: 'del',
  })
  .describe({
    new: 'Create todo item with given name',
    list: 'List todo items',
    done: 'Mark todo item by id as done',
    delete: 'Delete todo item by id',
  })
  .choices('list', ['all', 'done', 'pending'])
  .default('list', 'all')
  .requiresArg(['new', 'done', 'delete'])
  .showHelpOnFail(false, 'Specify --help for available options');

module.exports = argv.parse();
