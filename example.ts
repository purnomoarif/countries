// Optional, if needed
// import "dotenv/config";

import * as pg from "pg";

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});

await client.connect();

const res = await client.query("SELECT * FROM countries");

const countries = res.rows;

console.log({ countries });

await client.end();
