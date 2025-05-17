"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userSchema_1 = require("../../schemas/userSchema");
const user_functions_1 = __importDefault(require("../../utils/helper_functions/user-functions"));
const bcrypt_functions_1 = require("../../utils/helper_functions/bcrypt-functions");
const token_functions_1 = require("../../utils/helper_functions/token-functions");
const redis_functions_1 = require("../../utils/helper_functions/redis-functions");
const variables_1 = require("../../global/variables");
const updateUserController = async (req, res, next) => {
    try {
        const user_id = req.user?.user_id;
        const value = userSchema_1.updateUserSchema.safeParse(req.body);
        if (!value.success)
            return res.status(400).json({
                error: value.error.format()
            });
        const { email, password, name } = value.data;
        const checkUserId = {
            user_id: user_id
        };
        const checkUserEmail = {
            email: email
        };
        let result = await user_functions_1.default.checkUserWithId(checkUserId);
        const existingEmail = await user_functions_1.default.checkUserWithEmail(checkUserEmail);
        if (existingEmail)
            return res.status(400).json({
                error: "This email is not available. Try another one."
            });
        if (!result)
            return res.status(404).json({
                error: "User not found"
            });
        let { name: defaultName, email: defaultEmail, password: defaultPassword } = result;
        if (email && email !== defaultEmail) {
            defaultEmail = email;
            const accessToken = req.cookies['access_token'];
            const refreshToken = req.cookies['refresh_token'];
            await (0, redis_functions_1.blacklistToken)(accessToken);
            await (0, redis_functions_1.blacklistToken)(refreshToken);
            res.clearCookie('access_token', variables_1.accessCookie);
            res.clearCookie('refresh_token', variables_1.refreshCookie);
            const newAccessToken = (0, token_functions_1.generateAccessTokenString)(user_id);
            const newRefreshToken = (0, token_functions_1.generateRefreshTokenString)(user_id);
            res.cookie('access_token', newAccessToken, variables_1.accessCookie);
            res.cookie('refresh_token', newRefreshToken, variables_1.refreshCookie);
        }
        const newPassword = password && password !== defaultPassword ? await (0, bcrypt_functions_1.encryptedPassword)(password) : defaultPassword;
        const newName = name && name !== defaultName ? defaultName = name : defaultName;
        const user = {
            name: newName,
            email: defaultEmail,
            password: newPassword,
            user_id: user_id
        };
        const results = await user_functions_1.default.updateUserInfo(user);
        delete results.password;
        delete results.isVerified;
        delete results.created_at;
        res.status(200).json({
            success: true,
            body: results
        });
    }
    catch (error) {
        next(error);
    }
};
exports.default = updateUserController;
