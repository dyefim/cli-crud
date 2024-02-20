require('dotenv').config();
const pg = require('pg');
const { Client } = pg;

const args = process.argv.slice(2);
const [, tableName] = args[0].match(/--table=(\S+)/);

(async () => {
  const client = new Client();
  await client.connect();

  const res = await client.query(`SELECT * from ${tableName}`);
  console.log(res.rows);
  await client.end();
})();
