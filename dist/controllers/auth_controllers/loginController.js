"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("cookie-parser");
const userSchema_1 = require("../../schemas/userSchema");
const user_functions_1 = __importDefault(require("../../utils/helper_functions/user-functions"));
const token_functions_1 = require("../../utils/helper_functions/token-functions");
const bcrypt_functions_1 = require("../../utils/helper_functions/bcrypt-functions");
const variables_1 = require("../../global/variables");
const loginController = async ({ req, res, next }) => {
    try {
        const value = userSchema_1.loginSchema.safeParse(req.body);
        if (!value.success)
            return res.status(400).json({
                error: value.error.format()
            });
        const { email, password } = value.data;
        const user = {
            email: email
        };
        let result = await user_functions_1.default.checkUserWithEmail(user);
        if (!result)
            return res.status(404).json({
                error: "User not found. Please register or confirm your details"
            });
        const { password: storedHashedPassword, user_id, name, is_verified } = result;
        const match = await (0, bcrypt_functions_1.matchPasswords)(password, storedHashedPassword);
        if (!match)
            return res.status(400).json({
                error: "Passwords don\'t match"
            });
        const accessToken = (0, token_functions_1.generateAccessTokenString)(user_id);
        const refreshToken = (0, token_functions_1.generateRefreshTokenString)(user_id);
        res.clearCookie('refresh_token', variables_1.refreshCookie);
        res.clearCookie('access_token', variables_1.accessCookie);
        res.cookie('refresh_token', refreshToken, variables_1.refreshCookie);
        res.cookie('access_token', accessToken, variables_1.accessCookie);
        res.status(200).json({
            success: true,
            message: "User login successful!",
            body: {
                user_id: user_id,
                name: name,
                email: result.email,
                is_verified: is_verified
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.default = loginController;
