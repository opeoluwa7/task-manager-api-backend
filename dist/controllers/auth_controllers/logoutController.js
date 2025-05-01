"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("cookie-parser");
const redis_functions_1 = require("../../utils/helper_functions/redis-functions");
const logoutController = async (req, res, next) => {
    try {
        const accessToken = req.cookies['accessToken'];
        const refreshToken = req.cookies['refreshToken'];
        if (!accessToken)
            return res.status(401).json({
                success: false,
                error: "Token not found. Please login again"
            });
        await (0, redis_functions_1.blacklistToken)(accessToken);
        await (0, redis_functions_1.blacklistToken)(refreshToken);
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        res.clearCookie('refreshToken', {
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
