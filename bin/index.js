#!/usr/local/bin/node
const path = require('path');
const { spawnSync } = require('child_process');

const PROJECT_ROOT = path.join(__dirname, '..');

require('dotenv').config({ path: path.join(PROJECT_ROOT, '.env') });

const readline = require('readline');

const client = require('../db');
const { buildQuery } = require('../controller');
const { formatTable } = require('../utils');
const { parseArgv } = require('../args');

const ensureDb = () => {
  const result = spawnSync('bash', ['start.sh'], {
    cwd: PROJECT_ROOT,
    stdio: 'inherit',
  });
  if (result.status !== 0) {
    console.error('Failed to start DB.');
    process.exit(1);
  }
};

const PROMPT = 'todo> ';

const tokenize = (line) => {
  const re = /"([^"]*)"|'([^']*)'|(\S+)/g;
  const tokens = [];
  let m;
  while ((m = re.exec(line)) !== null) {
    tokens.push(m[1] ?? m[2] ?? m[3]);
  }
  return tokens;
};

const runCommand = async (line, rl) => {
  const tokens = tokenize(line.trim());
  if (tokens.length === 0) return;
  if (tokens[0] === 'exit' || tokens[0] === 'quit') {
    rl.close();
    return;
  }

  try {
    const argv = parseArgv(tokens);
    const res = await client.query(...buildQuery(argv));
    console.log(res.rows.length ? formatTable(res.rows) : 'Nothing changed');
  } catch (err) {
    console.error(err.message || 'Unexpected error. Type --help for options.');
  }
};

(async () => {
  ensureDb();
  await client.connect();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: PROMPT,
  });

  rl.on('SIGINT', () => rl.close());

  console.log('todo session started. Type --help for options, exit / Ctrl-C to quit.');
  rl.prompt();

  for await (const line of rl) {
    await runCommand(line, rl);
    rl.prompt();
  }

  console.log('\nBye.');
  await client.end();
})();
