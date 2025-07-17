"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// validations
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function signJWT(userpayload) {
    const token = jsonwebtoken_1.default.sign({ username: userpayload, permissions: "Admin", ua: "a" }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return token;
}
router.post("/", (req, res, next) => {
    try {
        const data = req.body;
        console.log(data);
        if (!data.userName || !data.password)
            throw new Error("Error missing passwrod/username");
        const token = signJWT(data.userName);
        res.setHeader("authorization", token).json({ message: "ok", token });
    }
    catch (error) {
        return next(error);
    }
});
router.get("/info", (req, res, next) => {
    res.json({ message: "ok" });
});
exports.default = router;
