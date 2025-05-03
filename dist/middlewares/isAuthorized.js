"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("cookie-parser");
const redis_functions_1 = require("../utils/helper_functions/redis-functions");
const token_functions_1 = require("../utils/helper_functions/token-functions");
const isAuthorized = {
    check: async (req, res, next) => {
        try {
            const accessToken = req.cookies['access_token'];
            if (!accessToken)
                return res.status(401).json({
                    error: "No Access Token found. please login"
                });
            const isBlacklisted = await (0, redis_functions_1.checkRedisBlacklist)(accessToken);
            if (isBlacklisted) {
                return res.status(401).json({
                    success: false,
                    error: "Token is blacklisted. Please login again"
                });
            }
            const decoded = (0, token_functions_1.verifyAccessTokenString)(accessToken);
            if (!decoded) {
                return res.status(401).json({
                    success: false,
                    error: 'Invalid access token provided. Please login again'
                });
            }
            req.user = decoded;
            next();
        }
        catch (error) {
            next(error);
        }
    }
};
exports.default = isAuthorized;
