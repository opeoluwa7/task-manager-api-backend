"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("cookie-parser");
const redis_functions_1 = require("../../utils/helper_functions/redis-functions");
const variables_1 = require("../../global/variables");
const logoutController = async ({ req, res, next }) => {
    try {
        const accessToken = req.cookies['access_token'];
        const refreshToken = req.cookies['refresh_token'];
        await (0, redis_functions_1.blacklistToken)(accessToken);
        await (0, redis_functions_1.blacklistToken)(refreshToken);
        res.clearCookie('access_token', variables_1.accessCookie);
        res.clearCookie('refresh_token', variables_1.refreshCookie);
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
