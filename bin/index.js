#!/usr/local/bin/node
require('dotenv').config();

const client = require('../db');

const { buildQuery } = require('../controller');
const { formatTable } = require('../utils');

(async () => {
  await client.connect();

  try {
    const res = await client.query(...buildQuery());

    if (res.rows.length) {
      console.log(formatTable(res.rows));
    } else {
      console.log('Nothing changed');
    }
  } catch (_error) {
    console.error('Unexpected error.', 'Specify --help for available options');
  }

  await client.end();
})();
