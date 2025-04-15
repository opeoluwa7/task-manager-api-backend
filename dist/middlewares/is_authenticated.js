"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jwt_1 = require("../utils/jwt");
const redis_1 = __importDefault(require("../utils/redis"));
module.exports = {
    check: async (req, res, next) => {
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader) {
                return res.status(401).json({
                    success: false,
                    error: {
                        message: 'Auth headers not provided in the request.'
                    }
                });
            }
            if (!authHeader.startsWith('Bearer')) {
                return res.status(401).json({
                    success: false,
                    error: {
                        message: 'Invalid auth mechanism.'
                    }
                });
            }
            const token = authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({
                    success: false,
                    error: {
                        message: 'Bearer token missing in the authorization headers.'
                    }
                });
            }
            try {
                const isBlacklisted = await redis_1.default.get(token);
                if (isBlacklisted) {
                    return res.status(401).json({
                        success: false,
                        error: "Invalid token. Login again"
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    error: `Token not blacklisted: ${error}`
                });
            }
            const decoded = (0, jwt_1.verifyToken)(token);
            if (!decoded) {
                return res.status(403).json({
                    success: false,
                    error: 'Invalid access token provided, please login again.'
                });
            }
            decoded.user_id = Number(decoded.user_id);
            req.user = decoded;
            next();
        }
        catch (error) {
            return res.status(403).json({
                success: false,
                error: 'Token verification failed, please login again.'
            });
        }
    }
};
