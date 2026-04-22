const yargs = require('yargs/yargs');

const buildParser = () =>
  yargs()
    .usage('Usage: <command> [options]')
    .alias({
      new: ['a', 'add'],
      done: ['d', 'check'],
      delete: 'del',
      tags: 'tag',
    })
    .describe({
      new: 'Create todo item with given name',
      list: 'List todo items',
      done: 'Mark todo item by id as done',
      delete: 'Delete todo item by id',
      tags: 'Specify tag(s) for todo item',
    })
    .array('new')
    .array('tags')
    .choices('list', ['all', 'done', 'pending'])
    .default('list', 'all')
    .requiresArg(['new', 'done', 'delete', 'tags'])
    .help()
    .exitProcess(false)
    .showHelpOnFail(false, 'Type --help for available options');

const parseArgv = (tokens) => buildParser().parse(tokens);

module.exports = { parseArgv };
