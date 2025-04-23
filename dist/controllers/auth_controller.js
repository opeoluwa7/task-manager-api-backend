"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const redis_1 = __importDefault(require("../utils/redis"));
const bcrypt_1 = require("../utils/bcrypt");
const jwt_1 = require("../utils/jwt");
const user_queries_1 = __importDefault(require("../config/db_queries/user_queries"));
const emailConfig_1 = require("../config/emailConfig");
const user_schema_1 = require("../schemas/user_schema");
const register = async (req, res, next) => {
    try {
        const value = user_schema_1.registerSchema.safeParse(req.body);
        if (!value.success) {
            return res.status(400).json({
                success: false,
                error: value.error.format()
            });
        }
        const { name, email, password } = value.data;
        const hashedPassword = await (0, bcrypt_1.encryptPassword)(password);
        const verificationToken = (0, jwt_1.generateVerificationToken)(email);
        const expiresIn = 600;
        await redis_1.default.setex("name", expiresIn, name);
        await redis_1.default.setex("email", expiresIn, email);
        await redis_1.default.setex("password", expiresIn, hashedPassword);
        await redis_1.default.setex("verification-token", expiresIn, verificationToken);
        await (0, emailConfig_1.sendEmailVerificationLink)(email);
        res.status(201).json({
            success: true,
            message: "An Email Verification link sent to you. Please verify"
        });
    }
    catch (error) {
        next(error);
    }
};
const verifyUser = async (req, res, next) => {
    try {
        const token = await redis_1.default.get("verification-token");
        const verificationToken = (0, jwt_1.verifyVerificationToken)(token);
        if (!verificationToken)
            return res.status(401).json({
                success: false,
                error: "Invalid verification token. Please register"
            });
        const name = await redis_1.default.get("name");
        const email = await redis_1.default.get("email");
        const password = await redis_1.default.get("password");
        const isVerified = true;
        const results = await user_queries_1.default.createUser(name, email, password, isVerified);
        if (!results)
            return res.status(500).json({
                success: false,
                error: "Error creating user"
            });
        res.status(200).send("<h1> User verified successfully!. You can now login </h1>");
    }
    catch (error) {
        next(error);
    }
};
const login = async (req, res, next) => {
    try {
        const value = user_schema_1.loginSchema.safeParse(req.body);
        if (!value.success)
            return res.status(400).json({
                success: false,
                error: value.error.format()
            });
        const { email, password } = value.data;
        const user = await user_queries_1.default.getUserWithEmail(email);
        if (!user)
            return res.status(404).json({
                success: false,
                error: "User not found. Please register or confirm your details"
            });
        const storedHashedPassword = user.password;
        const user_id = user.user_id;
        const name = user.name;
        const match = await (0, bcrypt_1.comparePasswords)(password, storedHashedPassword);
        if (!match)
            return res.status(400).json({
                success: false,
                error: "Passwords don\'t match"
            });
        const accessToken = (0, jwt_1.generateAccessToken)(user_id);
        const refreshToken = (0, jwt_1.generateRefreshToken)(user_id);
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/api/refresh-token'
        });
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: "/api/refresh-token"
        });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        res.status(201).json({
            success: true,
            message: "User login successful!",
            user: {
                user_id: user_id,
                name,
                email
            }
        });
    }
    catch (error) {
        next(error);
    }
};
const logout = async (req, res, next) => {
    try {
        const access_token = req.cookies['accessToken'];
        const refresh_token = req.cookies['refreshtoken'];
        if (!access_token)
            return res.status(401).json({
                success: false,
                error: "Token not found. Please login again"
            });
        const expiresIn = 900;
        await redis_1.default.setex(access_token, expiresIn, "blacklisted");
        await redis_1.default.setex(refresh_token, expiresIn, "blacklisted");
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
const requestPasswordReset = async (req, res, next) => {
    try {
        const value = user_schema_1.forgotPasswordSchema.safeParse(req.body);
        if (!value.success)
            return res.status(400).json({
                success: false,
                error: value.error.format()
            });
        const { email } = value.data;
        const user = await user_queries_1.default.getUserWithEmail(email);
        if (!user)
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        const resetToken = (0, jwt_1.generateResetToken)(user.user_id);
        const expiresIn = 600;
        await redis_1.default.setex("reset-token", expiresIn, resetToken);
        await (0, emailConfig_1.sendPasswordResetEmail)(user.email);
        res.status(201).json({
            success: true,
            message: "Your password reset email has been sent to you."
        });
    }
    catch (error) {
        next(error);
    }
};
const resetPassword = async (req, res, next) => {
    try {
        const value = user_schema_1.resetPasswordSchema.safeParse(req.body);
        if (!value.success)
            return res.status(400).json({
                success: false,
                error: value.error.format()
            });
        const data = value.data;
        const resetToken = await redis_1.default.get("reset-token");
        if (!resetToken)
            return res.status(401).json({
                success: false,
                error: "No reset token provided. Go back to forgot password"
            });
        const verified = (0, jwt_1.verifyResetToken)(resetToken);
        if (!verified)
            return res.status(401).json({
                error: "Invalid reset token. go back to forgot password"
            });
        const user = await user_queries_1.default.getUserWithId(verified.user_id);
        const currentPassword = user.password;
        const match = await (0, bcrypt_1.comparePasswords)(data.password, currentPassword);
        if (match)
            return res.status(400).json({
                success: false,
                error: "Passwords must not match. change it for better security."
            });
        const encryptedPassword = await (0, bcrypt_1.encryptPassword)(data.password);
        const results = await user_queries_1.default.updateUser(user.name, user.email, encryptedPassword, user.user_id);
        if (!results)
            return res.status(500).json({
                success: false,
                error: "Something went wrong"
            });
        res.status(200).json({
            success: true,
            message: "Password reset successful!",
            result: `This user can now login with the new password`
        });
    }
    catch (error) {
        next(error);
    }
};
const refreshAccessToken = async (req, res, next) => {
    try {
        const user_id = req.user?.user_id;
        const newAccessToken = (0, jwt_1.generateAccessToken)(user_id);
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        return res.status(200).json({
            success: true,
            message: "Token refreshed successfully"
        });
    }
    catch (err) {
        next(err);
    }
};
module.exports = {
    register,
    verifyUser,
    login,
    logout,
    requestPasswordReset,
    resetPassword,
    refreshAccessToken
};
