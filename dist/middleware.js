"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const userMiddleware = (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        if (!token || typeof token !== "string") {
            res
                .status(401)
                .json({ message: "Authorization header is missing or invalid" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_PASSWORD);
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        res.status(403).json({
            message: "Invalid or expired token"
        });
    }
};
exports.userMiddleware = userMiddleware;
