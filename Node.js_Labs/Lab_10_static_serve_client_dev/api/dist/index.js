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
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const requestLogger_1 = require("./middleware/requestLogger");
const addRequestId_1 = __importDefault(require("./middleware/addRequestId"));
const users_1 = __importDefault(require("./users"));
const login_1 = __importDefault(require("./login"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: "Too Many Requests!",
});
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json()); // if client sends body in post - we can extract it
app.use(requestLogger_1.requestLogger);
app.use((0, compression_1.default)());
app.use(addRequestId_1.default);
app.use(limiter);
app.use("/", express_1.default.static(path_1.default.join(__dirname, "public")));
console.log(path_1.default.join(__dirname, "public"));
app.get("/api/health-check", function (_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise((resolve) => setTimeout(resolve, 2000));
        res.send(`Api is Healthy ${new Date().toISOString()}`);
    });
});
app.use("/api/users", users_1.default);
app.use("/api/login", login_1.default);
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
