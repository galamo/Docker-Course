import express, { Request } from "express";
import dotenv from "dotenv";
import cors from "cors";
import comperssion from "compression";
import rateLimit from "express-rate-limit";
import { requestLogger } from "./middleware/requestLogger";
import data from "./c.json";
import addRequestId from "./middleware/addRequestId";
import { secureHeaders } from "./middleware/secureHeaders";

dotenv.config();
const app = express();

const defaultMaxNumberOfReq = +(process.env.WINDOW_LIMIT || 1000);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: defaultMaxNumberOfReq,
  message: "Too Many Requests!",
});

app.use(cors());
app.use(requestLogger);
app.use(comperssion());
app.use(addRequestId);
app.use(limiter);
app.use(secureHeaders);

// helmet
// xss
interface MyReq extends Request {
  user: { token: String };
}

app.use((req, res, next) => {
  (req as MyReq).user = { token: "test_token_on_request" };
  const key = req.query.key;
  console.log(key);
  if (!key || key !== process.env.APIKEY) {
    // return res.status(401).send("not authorized - sara");
    next(new Error("UNAUTH"));
  } else {
    return next();
  }
});

app.get("/health-check", async function (req, res) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log((req as MyReq).user.token, "aaa");
  res.send(`Api is Healthy ${new Date().toISOString()}`);
});

app.get("/country", (req, res, next) => {
  res.json(data);
});

app.get("/login", (req, res, next) => {
  res.setHeader("authorization", Date.now() + "_token");
  res.json({ message: "user logged in" });
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
