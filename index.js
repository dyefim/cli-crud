require('dotenv').config();
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const pg = require('pg');
const { Client } = pg;

const argv = yargs(hideBin(process.argv)).argv;

(async () => {
  const client = new Client();
  await client.connect();

  const queryText = `INSERT into list(
    name
  ) VALUES($1) RETURNING *`;

  const values = [argv.new];

  const res = await client.query(queryText, values);

  console.log(res.rows);
  await client.end();
})();
