"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("cookie-parser");
const redis_functions_1 = require("../../utils/helper_functions/redis-functions");
const logoutController = async (req, res, next) => {
    try {
        const access_token = req.cookies['access-token'];
        const refresh_token = req.cookies['refresh-token'];
        if (!access_token)
            return res.status(401).json({
                success: false,
                error: "Token not found. Please login again"
            });
        await (0, redis_functions_1.blacklistToken)(access_token);
        await (0, redis_functions_1.blacklistToken)(refresh_token);
        res.clearCookie('access-token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        res.clearCookie('refresh-token', {
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
