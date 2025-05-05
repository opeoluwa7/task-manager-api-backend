"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ms_1 = __importDefault(require("ms"));
require("cookie-parser");
const userSchema_1 = require("../../schemas/userSchema");
const user_functions_1 = __importDefault(require("../../utils/helper_functions/user-functions"));
const token_functions_1 = require("../../utils/helper_functions/token-functions");
const bcrypt_functions_1 = require("../../utils/helper_functions/bcrypt-functions");
const loginController = async (req, res, next) => {
    try {
        const value = userSchema_1.loginSchema.safeParse(req.body);
        if (!value.success)
            return res.status(400).json({
                error: value.error.format()
            });
        const { email, password } = value.data;
        const user = await user_functions_1.default.checkUserWithEmail(email);
        if (!user)
            return res.status(404).json({
                error: "User not found. Please register or confirm your details"
            });
        const storedHashedPassword = user.password;
        const user_id = user.user_id;
        const name = user.name;
        const isVerified = user.is_verified;
        const match = await (0, bcrypt_functions_1.matchPasswords)(password, storedHashedPassword);
        if (!match)
            return res.status(400).json({
                error: "Passwords don\'t match"
            });
        const accessToken = (0, token_functions_1.generateAccessTokenString)(user_id);
        const refreshToken = (0, token_functions_1.generateRefreshTokenString)(user_id);
        res.clearCookie('refresh_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/api/refresh-token'
        });
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: "/api/refresh-token",
            maxAge: (0, ms_1.default)('3d')
        });
        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: (0, ms_1.default)('10m')
        });
        res.status(200).json({
            success: true,
            message: "User login successful!",
            user: {
                user_id: user_id,
                name: name,
                email: user.email,
                isVerified: isVerified
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.default = loginController;
