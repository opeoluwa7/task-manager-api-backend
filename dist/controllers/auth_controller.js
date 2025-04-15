"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const redis_1 = __importDefault(require("../utils/redis"));
const bcrypt_1 = require("../utils/bcrypt");
const jwt_1 = require("../utils/jwt");
const joi_validation_1 = require("../utils/joi_validation");
const auth_queries_1 = require("../config/db/auth_queries");
const user_queries_1 = __importDefault(require("../config/db/user_queries"));
const resetEmailConfig_1 = __importDefault(require("../config/resetEmailConfig"));
const register = async (req, res, next) => {
    try {
        const object = req.body;
        const { error, value } = joi_validation_1.authSchema.validate(object, { convert: true });
        if (error)
            return res.status(400).json({
                success: false,
                error: error.details[0].message
            });
        const { email, password, name } = value;
        const existingUser = await auth_queries_1.authQueries.getUserDetails(email);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: "This email is already registered"
            });
        }
        const encryptedPassword = await (0, bcrypt_1.encryptPassword)(password);
        const results = await auth_queries_1.authQueries.createUser(name, email, encryptedPassword);
        const user_id = results.user_id;
        const accessToken = (0, jwt_1.generateAccessToken)(email, user_id);
        res.status(201).json({
            success: true,
            message: "User registered successfully!",
            user: {
                user_id: user_id,
                name,
                email
            },
            token: accessToken
        });
    }
    catch (error) {
        next(error);
    }
};
const login = async (req, res, next) => {
    try {
        const { error, value } = joi_validation_1.authSchema.validate(req.body, { convert: true });
        if (error)
            return res.status(400).json({
                success: false,
                error: error.details[0].message
            });
        const { email, password } = value;
        const user = await auth_queries_1.authQueries.getUserDetails(email);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }
        const storedHashedPassword = user.password;
        const user_id = user.user_id;
        const name = user.name;
        const match = await (0, bcrypt_1.comparePasswords)(password, storedHashedPassword);
        if (!match) {
            return res.status(401).json({
                success: false,
                error: "Passwords don\'t match"
            });
        }
        const accessToken = (0, jwt_1.generateAccessToken)(email, user_id);
        console.log(accessToken);
        res.status(200).json({
            success: true,
            message: "User login successful!",
            user: {
                user_id: user_id,
                name,
                email
            },
            token: accessToken
        });
    }
    catch (error) {
        next(error);
    }
};
const logout = async (req, res, next) => {
    try {
        const authHeaders = req.headers['authorization'];
        const token = authHeaders.split(' ')[1];
        if (!token) {
            return res.status(400).json({
                success: false,
                error: "Token required in the request body"
            });
        }
        const expiresIn = 900;
        await redis_1.default.setex(token, expiresIn, "blacklisted");
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
        const { error, value } = joi_validation_1.authSchema.fork(['password'], field => field.optional()).validate({ email: req.body.email }, { convert: true });
        if (error)
            return res.status(400).json({
                success: false,
                error: error.details[0].message
            });
        let { email } = value;
        const user = await auth_queries_1.authQueries.getUserDetails(email);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }
        const resetToken = (0, jwt_1.generateAccessToken)(user.email, user.user_id);
        await (0, resetEmailConfig_1.default)(user.email, resetToken);
        res.status(200).json({
            success: true,
            message: "Password reset email sent.",
            resetToken: resetToken
        });
    }
    catch (error) {
        next(error);
    }
};
const resetPassword = async (req, res, next) => {
    try {
        const { error, value } = joi_validation_1.authSchema.fork(['email'], field => field.optional()).validate(req.body, { convert: true });
        if (error)
            return res.status(400).json({
                success: false,
                error: error.details[0].message
            });
        const { password: newPassword, resetToken } = value;
        const verified = (0, jwt_1.verifyToken)(resetToken);
        if (!verified) {
            return res.status(500).json({
                error: "token not verified"
            });
        }
        const user = await user_queries_1.default.getUserAfterAuth(verified.user_id);
        const currentPassword = user.password;
        const match = await (0, bcrypt_1.comparePasswords)(newPassword, currentPassword);
        if (match) {
            return res.status(400).json({
                success: false,
                error: "Passwords must not match. change it for better security."
            });
        }
        const encryptedPassword = await (0, bcrypt_1.encryptPassword)(newPassword);
        const results = await user_queries_1.default.updateUser(user.name, user.email, encryptedPassword, user.user_id);
        if (!results) {
            return res.status(400).json({
                success: false,
                error: "Something went wrong"
            });
        }
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
module.exports = {
    register,
    login,
    logout,
    requestPasswordReset,
    resetPassword
};
