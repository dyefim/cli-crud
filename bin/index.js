#!/usr/local/bin/node
require('dotenv').config();

const pg = require('pg');

const getQuery = require('../controller');
const { getListQuery } = require('../queries');
const { formatTable } = require('../utils');

const { Client } = pg;
const client = new Client();

(async () => {
  await client.connect();

  try {
    const res = await client.query(...getQuery());

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
