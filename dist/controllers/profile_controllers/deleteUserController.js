"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_functions_1 = require("../../utils/helper_functions/redis-functions");
const user_functions_1 = __importDefault(require("../../utils/helper_functions/user-functions"));
const variables_1 = require("../../global/variables");
const deleteUserController = async (express) => {
    try {
        const user_id = express.req.user?.user_id;
        const user = {
            user_id: user_id
        };
        const result = await user_functions_1.default.deleteUserInfo(user);
        if (!result) {
            return express.res.status(404).json({
                message: "User not found"
            });
        }
        const accessToken = express.req.cookies['access_token'];
        const refreshToken = express.req.cookies['refresh_token'];
        await (0, redis_functions_1.blacklistToken)(accessToken);
        await (0, redis_functions_1.blacklistToken)(refreshToken);
        express.res.clearCookie("access_token", variables_1.accessCookie);
        express.res.clearCookie("refresh_token", variables_1.refreshCookie);
        express.res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    }
    catch (error) {
        express.next(error);
    }
};
exports.default = deleteUserController;
