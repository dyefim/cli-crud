require('dotenv').config();

const controller = require('./controller');
const pg = require('pg');
const { Client } = pg;

(async () => {
  const client = new Client();
  await client.connect();

  const query = controller();

  const res = await client.query(...query);

  console.log(res.rows);
  await client.end();
})();
