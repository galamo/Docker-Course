"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const requestLogger_1 = require("./middleware/requestLogger");
const c_json_1 = __importDefault(require("./c.json"));
const addRequestId_1 = __importDefault(require("./middleware/addRequestId"));
const worker_threads_1 = require("worker_threads");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: "Too Many Requests!",
});
app.use((0, cors_1.default)());
app.use(requestLogger_1.requestLogger);
app.use((0, compression_1.default)());
app.use(addRequestId_1.default);
app.use(limiter);
app.get("/health-check", function (_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(`Api is Healthy ${new Date().toISOString()}`);
    });
});
app.get("/country", (req, res, next) => {
    res.json(c_json_1.default);
});
app.get("/long-calculation", (req, res, next) => {
    for (let index = 0; index < 9999999999; index++) { }
    res.send(`Finished ${new Date().toISOString()}`);
});
function getResponseFromWorker(worker) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            worker.on("message", (result) => {
                console.log("Result from worker:", result);
                resolve("Workere Finished");
            });
            worker.on("error", (error) => {
                console.error("Worker error:", error);
                reject("Error from worker");
            });
        });
    });
}
app.get("/generate-report", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const worker = startWorker();
    worker.postMessage({ task: "longCalculation", data: [1, 2, 3, 4, 5] });
    try {
        const result = yield getResponseFromWorker(worker);
        return res.send(`Finished ${new Date().toISOString()} ___${result}`);
    }
    catch (error) {
        console.log(error);
        return next(new Error(error.message));
    }
}));
function startWorker() {
    return new worker_threads_1.Worker(path_1.default.join(__dirname, "worker.js"));
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
        }
        else {
            console.log("Worker finished successfully");
        }
    });
});
app.use((error, req, res, next) => {
    console.log(res.get("x-request-id"), error.message);
    if (error.message === "UNAUTH") {
        res.status(401).send("Unauthorized");
    }
    else
        res.status(500).send("Something went wrong, Nissan is working to fix it");
});
app.listen(process.env.PORT, () => {
    console.log(`Api is running on port ${process.env.PORT}`);
});
