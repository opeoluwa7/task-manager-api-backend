"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("cookie-parser");
const jwt_1 = require("../utils/jwt");
const redis_1 = __importDefault(require("../utils/redis"));
const isAuthorized = {
    check: async (req, res, next) => {
        try {
            const access_token = req.cookies['accessToken'];
            if (!access_token)
                return res.status(401).json({
                    error: "No Access Token found. please login"
                });
            const isBlacklisted = await redis_1.default.get(access_token);
            if (isBlacklisted) {
                return res.status(401).json({
                    success: false,
                    error: "Token is blacklisted. Please login again"
                });
            }
            const decoded = (0, jwt_1.verifyAccessToken)(access_token);
            if (!decoded) {
                return res.status(401).json({
                    success: false,
                    error: 'Invalid access token provided. Please login again'
                });
            }
            decoded.user_id = Number(decoded.user_id);
            req.user = decoded;
            next();
        }
        catch (error) {
            next(error);
        }
    }
};
exports.default = isAuthorized;
