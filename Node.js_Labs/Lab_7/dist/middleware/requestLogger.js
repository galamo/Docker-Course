"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const requestLogger = (req, res, next) => {
    console.log(`Request Started ${new Date().toISOString()} => ${req.url}`);
    res.on("finish", () => {
        console.log(`Request Finished ${new Date().toISOString()} => ${req.url}`);
    });
    next();
};
exports.requestLogger = requestLogger;
