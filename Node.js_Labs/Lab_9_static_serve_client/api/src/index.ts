import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import comperssion from "compression";
import rateLimit from "express-rate-limit";
import { requestLogger } from "./middleware/requestLogger";
import addRequestId from "./middleware/addRequestId";
import path from "path";

dotenv.config();
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: "Too Many Requests!",
});

app.use(cors());
app.use(requestLogger);
app.use(comperssion());
app.use(addRequestId);
app.use(limiter);

app.use("/", express.static(path.join(__dirname, "public")));
// app.use((req: Request, res: Response, next: NextFunction) => {
//   console.log("Protecting Front Static Applications");
//   if (!req.headers["Authorization"]) {
//     res.send("<h1> Go home </h1>");
//   } else {
//     next();
//   }
// });

app.use("/agrot", express.static(path.join(__dirname, "public")));
app.use("/savion", express.static(path.join(__dirname, "public")));

app.get("/health-check", async function (_, res) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  res.send(`Api is Healthy ${new Date().toISOString()}`);
});

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
