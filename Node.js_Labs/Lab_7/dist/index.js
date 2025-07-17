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
const secureHeaders_1 = require("./middleware/secureHeaders");
dotenv_1.default.config();
const app = (0, express_1.default)();
const defaultMaxNumberOfReq = +(process.env.WINDOW_LIMIT || 1000);
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: defaultMaxNumberOfReq,
    message: "Too Many Requests!",
});
app.use((0, cors_1.default)());
app.use(requestLogger_1.requestLogger);
app.use((0, compression_1.default)());
app.use(addRequestId_1.default);
app.use(limiter);
app.use(secureHeaders_1.secureHeaders);
app.use((req, res, next) => {
    req.user = { token: "test_token_on_request" };
    const key = req.query.key;
    console.log(key);
    if (!key || key !== process.env.APIKEY) {
        // return res.status(401).send("not authorized - sara");
        next(new Error("UNAUTH"));
    }
    else {
        return next();
    }
});
app.get("/health-check", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise((resolve) => setTimeout(resolve, 2000));
        console.log(req.user.token, "aaa");
        res.send(`Api is Healthy ${new Date().toISOString()}`);
    });
});
app.get("/country", (req, res, next) => {
    res.json(c_json_1.default);
});
app.get("/login", (req, res, next) => {
    res.setHeader("authorization", Date.now() + "_token");
    res.json({ message: "user logged in" });
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
