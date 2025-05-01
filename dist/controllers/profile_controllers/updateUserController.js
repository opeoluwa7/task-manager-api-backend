"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("../../schemas/user_schema");
const user_functions_1 = __importDefault(require("../../utils/helper_functions/user-functions"));
const bcrypt_functions_1 = require("../../utils/helper_functions/bcrypt-functions");
const redis_functions_1 = require("../../utils/helper_functions/redis-functions");
const token_functions_1 = require("../../utils/helper_functions/token-functions");
const ms_1 = __importDefault(require("ms"));
const updateUserController = async (req, res, next) => {
    try {
        const user_id = req.user?.user_id;
        const value = user_schema_1.updateUserSchema.safeParse(req.body);
        if (!value.success)
            return res.status(400).json({
                success: false,
                error: value.error.format()
            });
        const { email: newEmail, password: newPassword, name: newName } = value.data;
        const user = await user_functions_1.default.checkUserWithId(user_id);
        const existingEmail = await user_functions_1.default.checkUserWithEmail(newEmail);
        if (existingEmail)
            return res.status(400).json({
                success: false,
                error: "This email is not available. Try another one."
            });
        if (!user)
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        let currentEmail = user.email;
        let currentName = user.name;
        const currentPassword = user.password;
        if (newEmail && newEmail !== currentEmail) {
            currentEmail = newEmail;
            const accessToken = req.cookies['access-token'];
            const refreshToken = req.cookies['refresh-token'];
            await (0, redis_functions_1.storeTempInRedis)(accessToken, "blacklisted");
            await (0, redis_functions_1.storeTempInRedis)(refreshToken, "blacklisted");
            res.clearCookie('accessToken', {
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            });
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                path: "api/refresh-token"
            });
            const newAccessToken = (0, token_functions_1.generateAccessTokenString)(user_id);
            const newRefreshToken = (0, token_functions_1.generateRefreshTokenString)(user_id);
            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: (0, ms_1.default)('10m')
            });
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                path: "api/refresh-token",
                maxAge: (0, ms_1.default)('3d')
            });
        }
        else {
            return currentEmail;
        }
        const password = newPassword && newPassword !== currentPassword ? await (0, bcrypt_functions_1.encryptedPassword)(newPassword) : currentPassword;
        const name = newName && newName !== currentName ? currentName = newName : currentName;
        const results = await user_functions_1.default.updateUserInfo(name, currentEmail, password, user_id);
        delete results.password;
        res.status(200).json({
            success: true,
            updatedUser: results
        });
    }
    catch (error) {
        next(error);
    }
};
exports.default = updateUserController;
