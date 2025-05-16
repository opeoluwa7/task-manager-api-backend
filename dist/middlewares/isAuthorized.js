"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("cookie-parser");
const redis_functions_1 = require("../utils/helper_functions/redis-functions");
const token_functions_1 = require("../utils/helper_functions/token-functions");
const isAuthorized = {
    check: async (express) => {
        try {
            const accessToken = express.req.cookies['access_token'];
            if (!accessToken)
                return express.res.status(401).json({
                    error: "No Access Token found. please login"
                });
            const isBlacklisted = await (0, redis_functions_1.checkRedisBlacklist)(accessToken);
            if (isBlacklisted) {
                return express.res.status(401).json({
                    error: "Token is blacklisted. Please login again"
                });
            }
            const decoded = (0, token_functions_1.verifyAccessTokenString)(accessToken);
            if (!decoded) {
                return express.res.status(401).json({
                    error: 'Invalid access token provided. Please login again'
                });
            }
            express.req.user = decoded;
            express.next();
        }
        catch (error) {
            express.next(error);
        }
    }
};
exports.default = isAuthorized;
