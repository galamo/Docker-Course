"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((req, res, next) => {
    console.log(`Request Started ${new Date().toISOString()} => ${req.url}`);
    next();
});
app.get("/health-check", function (_, res) {
    // @ts-ignore
    a;
    res.send(`Api is Healthy ${new Date().toISOString()}`);
});
app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).send("Something went wrong, Nissan is working to fix it");
});
app.listen(process.env.PORT, () => {
    console.log(`Api is running on port ${process.env.PORT}`);
});
