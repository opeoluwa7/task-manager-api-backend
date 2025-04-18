"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("cookie-parser");
const redis_1 = __importDefault(require("../utils/redis"));
const jwt_1 = require("../utils/jwt");
const refreshTokenMiddlware = async (req, res, next) => {
    try {
        const refresh_token = req.cookies['refreshToken'];
        if (!refresh_token) {
            return res.status(401).json({
                success: false,
                error: "No refresh token provided. Please login"
            });
        }
        const blacklisted = await redis_1.default.get(refresh_token);
        if (blacklisted) {
            return res.status(401).json({
                success: false,
                error: "Token is blacklisted. Please login again"
            });
        }
        const decoded = (0, jwt_1.verifyRefreshToken)(refresh_token);
        if (!decoded)
            return res.status(401).json({
                success: false,
                error: "Invalid refresh token provided. Please login again."
            });
        decoded.user_id = Number(decoded.user_id);
        req.user = decoded;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = refreshTokenMiddlware;
