"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const user_queries_1 = __importDefault(require("../config/db_queries/user_queries"));
const user_schema_1 = require("../schemas/user_schema");
const bcrypt_1 = require("../utils/bcrypt");
const jwt_1 = require("../utils/jwt");
const redis_1 = __importDefault(require("../utils/redis"));
const findUser = async (req, res, next) => {
    try {
        const user_id = req.user?.user_id;
        const user = await user_queries_1.default.getUserAfterAuth(user_id);
        if (!user)
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        res.status(200).json({
            success: true,
            user: {
                user_id: user.user_id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (error) {
        next(error);
    }
};
const updateUser = async (req, res, next) => {
    try {
        const user_id = req.user?.user_id;
        const value = user_schema_1.updateUserSchema.safeParse(req.body);
        if (!value.success) {
            return res.status(400).json({
                success: false,
                error: value.error.format()
            });
        }
        const { email: newEmail, password: newPassword, name } = value.data;
        const user = await user_queries_1.default.getUserAfterAuth(user_id);
        if (!user)
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        const currentEmail = user.email;
        const currentPassword = user.password;
        if (newEmail && newEmail !== currentEmail) {
            const access_token = req.cookies['accessToken'];
            const expiresIn = 900;
            await redis_1.default.setex(access_token, expiresIn, "blacklisted");
            const newAccessToken = (0, jwt_1.generateAccessToken)(req.user?.user_id);
            console.log("Access token:", newAccessToken);
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
        }
        let encryptedPassword = newPassword ? await (0, bcrypt_1.encryptPassword)(newPassword) : currentPassword;
        const results = await user_queries_1.default.updateUser(name, newEmail, encryptedPassword, user_id);
        res.status(200).json({
            success: true,
            updatedUser: {
                user_id: results.user_id,
                name: results.name,
                email: results.email,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
const deleteUser = async (req, res, next) => {
    try {
        const user_id = req.user?.user_id;
        const result = await user_queries_1.default.deleteUser(user_id);
        if (!result) {
            return res.status(500).json({
                success: false,
                message: "Error deleting user. Try again"
            });
        }
        const access_token = req.cookies['accessToken'];
        const refresh_token = req.cookies['refreshToken'];
        const expiresIn = 900;
        await redis_1.default.setex(access_token, expiresIn, "blacklisted");
        await redis_1.default.setex(refresh_token, expiresIn, "blacklisted");
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: false,
            sameSite: 'none'
        });
        res.clearCookie("refreshToken", {
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
module.exports = {
    findUser,
    updateUser,
    deleteUser
};
