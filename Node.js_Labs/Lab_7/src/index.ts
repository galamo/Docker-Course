import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { requestStarted } from "./middleware/requestStarted";
import { requestLogger } from "./middleware/requestLogger";
dotenv.config();
const app = express();

app.use(cors());
// app.use(requestStarted);
app.use(requestLogger);

app.get("/health-check", async function (_, res) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  res.send(`Api is Healthy ${new Date().toISOString()}`);
});

app.use((error: any, req: any, res: any, next: any) => {
  res.status(500).send("Something went wrong, Nissan is working to fix it");
});

app.listen(process.env.PORT, () => {
  console.log(`Api is running on port ${process.env.PORT}`);
});
