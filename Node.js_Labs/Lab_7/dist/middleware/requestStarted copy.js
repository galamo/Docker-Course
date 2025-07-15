"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestStarted = void 0;
const requestStarted = (req, res, next) => {
    console.log(`Request Started ${new Date().toISOString()} => ${req.url}`);
    next();
};
exports.requestStarted = requestStarted;
