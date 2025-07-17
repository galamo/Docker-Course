import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import comperssion from "compression";
import rateLimit from "express-rate-limit";
import { requestLogger } from "./middleware/requestLogger";
import addRequestId from "./middleware/addRequestId";
import usersRouter from "./users";
import loginRouter from "./login";

import path from "path";

dotenv.config();
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: "Too Many Requests!",
});

app.use(cors());
app.use(bodyParser.json()); // if client sends body in post - we can extract it
app.use(requestLogger);
app.use(comperssion());
app.use(addRequestId);
app.use(limiter);

app.use("/", express.static(path.join(__dirname, "public")));
console.log(path.join(__dirname, "public"));

app.get("/api/health-check", async function (_, res) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  res.send(`Api is Healthy ${new Date().toISOString()}`);
});

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use((error: any, req: any, res: any, next: any) => {
  console.log(res.get("x-request-id"), error.message);
  if (error.message === "UNAUTH") {
    res.status(401).send("Unauthorized");
  } else
    res.status(500).send("Something went wrong, Nissan is working to fix it");
});

app.listen(process.env.PORT, () => {
  console.log(`Api is running on port ${process.env.PORT}`);
});
