"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const addRequestId = (req, res, next) => {
    res.setHeader("x-request-id", (0, uuid_1.v4)());
    next();
};
exports.default = addRequestId;
