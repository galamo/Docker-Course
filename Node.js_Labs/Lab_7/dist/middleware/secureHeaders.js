"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secureHeaders = void 0;
const unsecuredHeaders = [
    "x-powered-by",
    "x-ratelimit-limit",
    "x-ratelimit-reset",
];
const secureHeaders = (req, res, next) => {
    unsecuredHeaders.forEach((item) => {
        res.removeHeader(item);
    });
    next();
};
exports.secureHeaders = secureHeaders;
