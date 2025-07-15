const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get("/users", (req, res) => {
  pool.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get("/users", (req, res) => {
  pool.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get("/long-ms", async function (_, res) {
  const result = await longCalc();
  res.send(`long ${new Date().toISOString()}`);
});

async function longCalc() {
  return new Promise((resolve, rej) => {
    for (let index = 0; index < 9999999999; index++) {}
    resolve(1);
  });
}

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
