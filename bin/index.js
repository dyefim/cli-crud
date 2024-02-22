#!/usr/local/bin/node
require('dotenv').config();

const pg = require('pg');
const getQuery = require('../controller');
const { getListQuery } = require('../queries');

const { Client } = pg;
const client = new Client();

(async () => {
  await client.connect();

  try {
    const res = await client.query(...getQuery());

    if (res.rows.length) {
      console.log(res.rows);
    } else {
      console.log('Nothing changed');
    }
  } catch {
    console.error('Unexpected input.', 'Specify --help for available options');
  }

  await client.end();
})();
