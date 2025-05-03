"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_functions_1 = require("../../utils/helper_functions/redis-functions");
const user_functions_1 = __importDefault(require("../../utils/helper_functions/user-functions"));
const deleteUserController = async (req, res, next) => {
    try {
        const user_id = req.user?.user_id;
        await user_functions_1.default.deleteUserInfo(user_id);
        const stillExists = await user_functions_1.default.checkUserWithId(user_id);
        if (!stillExists) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const access_token = req.cookies['accessToken'];
        const refresh_token = req.cookies['refreshToken'];
        await (0, redis_functions_1.storeTempInRedis)(access_token, "blacklisted");
        await (0, redis_functions_1.storeTempInRedis)(refresh_token, "blacklisted");
        res.clearCookie("access-token", {
            httpOnly: true,
            secure: false,
            sameSite: 'none'
        });
        res.clearCookie("refresh-token", {
            httpOnly: true,
            secure: false,
            sameSite: 'none',
            path: '/api/refresh-token'
        });
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    }
    catch (error) {
        next(error);
    }
};
exports.default = deleteUserController;
