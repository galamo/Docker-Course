import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import comperssion from "compression";
import rateLimit from "express-rate-limit";
import { requestLogger } from "./middleware/requestLogger";

import data from "./c.json";
dotenv.config();
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too Many Requests!",
});

app.use(cors());
app.use(requestLogger);
app.use(comperssion());
app.use(limiter);

// helmet
// xss

app.get("/health-check", async function (_, res) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  res.send(`Api is Healthy ${new Date().toISOString()}`);
});

app.get("/country", (req, res, next) => {
  res.json(data);
});

app.use((error: any, req: any, res: any, next: any) => {
  res.status(500).send("Something went wrong, Nissan is working to fix it");
});

app.listen(process.env.PORT, () => {
  console.log(`Api is running on port ${process.env.PORT}`);
});
