"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_functions_1 = require("../../utils/helper_functions/redis-functions");
const user_functions_1 = __importDefault(require("../../utils/helper_functions/user-functions"));
const variables_1 = require("../../global/variables");
const deleteUserController = async (req, res, next) => {
    try {
        const user_id = req.user?.user_id;
        const user = {
            user_id: user_id
        };
        const result = await user_functions_1.default.deleteUserInfo(user);
        if (!result) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const accessToken = req.cookies['access_token'];
        const refreshToken = req.cookies['refresh_token'];
        await (0, redis_functions_1.blacklistToken)(accessToken);
        await (0, redis_functions_1.blacklistToken)(refreshToken);
        res.clearCookie("access_token", variables_1.accessCookie);
        res.clearCookie("refresh_token", variables_1.refreshCookie);
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
