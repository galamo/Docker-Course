import express from "express";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
const app = express();

app.get("/health-check", function (_, res) {
  res.send(`Api is Healthy ${new Date().toISOString()}`);
});

app.get("/image-processor", async function (_, res) {
  console.log(`long-start ${new Date().toISOString()}`);
  const result = await axios.get("http://localhost:3000/long-ms");
  res.send(`long ${new Date().toISOString()}`);
});

app.get("/short", function (_, res) {
  console.log(`short-start ${new Date().toISOString()}`);
  res.send(`short ${new Date().toISOString()}`);
});

app.listen(process.env.PORT, () => {
  console.log(`Api is running on port ${process.env.PORT}`);
});
