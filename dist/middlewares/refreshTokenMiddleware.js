"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("cookie-parser");
const redis_functions_1 = require("../utils/helper_functions/redis-functions");
const token_functions_1 = require("../utils/helper_functions/token-functions");
const refreshTokenMiddlware = async (req, res, next) => {
    try {
        const refreshToken = req.cookies['refresh-token'];
        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                error: "No refresh token provided. Please login"
            });
        }
        const blacklisted = await (0, redis_functions_1.getFromRedis)(refreshToken);
        if (blacklisted) {
            return res.status(401).json({
                success: false,
                error: "Token is blacklisted. Please login again"
            });
        }
        const decoded = (0, token_functions_1.verifyRefreshTokenString)(refreshToken);
        if (!decoded)
            return res.status(401).json({
                success: false,
                error: "Invalid refresh token provided. Please login again."
            });
        req.user = decoded;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = refreshTokenMiddlware;
