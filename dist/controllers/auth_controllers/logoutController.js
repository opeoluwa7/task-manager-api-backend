"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("cookie-parser");
const redis_functions_1 = require("../../utils/helper_functions/redis-functions");
const logoutController = async (req, res, next) => {
    try {
        const accessToken = req.cookies['access_token'];
        const refreshToken = req.cookies['refresh_token'];
        await (0, redis_functions_1.storeTempInRedis)(accessToken, "blacklisted");
        await (0, redis_functions_1.storeTempInRedis)(refreshToken, "blacklisted");
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        res.clearCookie('refresh_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: "/api/refresh-token"
        });
        res.status(200).json({
            success: true,
            message: "User logged out successfully!"
        });
    }
    catch (error) {
        next(error);
    }
};
exports.default = logoutController;
