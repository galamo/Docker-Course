"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const requestLogger = (req, res, next) => {
    const startTime = Date.now();
    console.log(`Request Started ${new Date().toISOString()} => ${req.url}`);
    res.on("finish", () => {
        const duration = Date.now() - startTime;
        console.log(`Request Finished ${new Date().toISOString()} => ${req.url}, duration: ${duration}ms`);
    });
    next();
};
exports.requestLogger = requestLogger;
