import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import comperssion from "compression";
import rateLimit from "express-rate-limit";
import { requestLogger } from "./middleware/requestLogger";
import data from "./c.json";
import addRequestId from "./middleware/addRequestId";
import { Worker } from "worker_threads";
import path from "path";
type WorkerType = typeof Worker;
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

app.get("/health-check", async function (_, res) {
  res.send(`Api is Healthy ${new Date().toISOString()}`);
});

app.get("/country", (req, res, next) => {
  res.json(data);
});

app.get("/long-calculation", (req, res, next) => {
  for (let index = 0; index < 9999999999; index++) {}
  res.send(`Finished ${new Date().toISOString()}`);
});

async function getResponseFromWorker<T>(worker: any) {
  return new Promise((resolve, reject) => {
    worker.on("message", (result: T) => {
      console.log("Result from worker:", result);
      resolve("Workere Finished");
    });
    worker.on("error", (error: any) => {
      console.error("Worker error:", error);
      reject("Error from worker");
    });
  });
}

app.get("/generate-report", async (req, res, next) => {
  const worker = startWorker();
  worker.postMessage({ task: "longCalculation", data: [1, 2, 3, 4, 5] });
  try {
    const result = await getResponseFromWorker<string>(worker);
    return res.send(`Finished ${new Date().toISOString()} ___${result}`);
  } catch (error: any) {
    console.log(error);
    return next(new Error(error.message));
  }
});

function startWorker() {
  return new Worker(path.join(__dirname, "worker.js"));
}

app.get("/long-calculation-thread", (req, res, next) => {
  const worker = startWorker();
  worker.postMessage({ task: "longCalculation", data: [1, 2, 3, 4, 5] });

  worker.on("message", (result) => {
    console.log("Result from worker:", result);
    res.send(`Finished ${new Date().toISOString()} ___` + result);
  });
  worker.on("error", (error) => {
    console.error("Worker error:", error);
    return next(new Error("Error from worker"));
  });
  worker.on("exit", (code) => {
    if (code !== 0) {
      console.error(`Worker stopped with exit code ${code}`);
    } else {
      console.log("Worker finished successfully");
    }
  });
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
