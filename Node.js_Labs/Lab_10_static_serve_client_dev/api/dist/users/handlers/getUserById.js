"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = getUserById;
const index_1 = require("../index");
function getUserById(id) {
    return index_1.users.find((u) => u.id === id);
}
