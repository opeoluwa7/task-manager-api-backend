"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("cookie-parser");
const redis_functions_1 = require("../../utils/helper_functions/redis-functions");
const variables_1 = require("../../global/variables");
const logoutController = async (express) => {
    try {
        const accessToken = express.req.cookies['access_token'];
        const refreshToken = express.req.cookies['refresh_token'];
        await (0, redis_functions_1.blacklistToken)(accessToken);
        await (0, redis_functions_1.blacklistToken)(refreshToken);
        express.res.clearCookie('access_token', variables_1.accessCookie);
        express.res.clearCookie('refresh_token', variables_1.refreshCookie);
        express.res.status(200).json({
            success: true,
            message: "User logged out successfully!"
        });
    }
    catch (error) {
        express.next(error);
    }
};
exports.default = logoutController;
