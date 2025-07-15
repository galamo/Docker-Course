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
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.get("/health-check", function (_, res) {
    res.send(`Api is Healthy ${new Date().toISOString()}`);
});
app.get("/image-processor", function (_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`long-start ${new Date().toISOString()}`);
        const result = yield axios_1.default.get("http://localhost:3000/long-ms");
        res.send(`long ${new Date().toISOString()}`);
    });
});
app.get("/short", function (_, res) {
    console.log(`short-start ${new Date().toISOString()}`);
    res.send(`short ${new Date().toISOString()}`);
});
app.listen(process.env.PORT, () => {
    console.log(`Api is running on port ${process.env.PORT}`);
});
