"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userSchema_1 = require("../../schemas/userSchema");
const user_functions_1 = __importDefault(require("../../utils/helper_functions/user-functions"));
const redis_functions_1 = require("../../utils/helper_functions/redis-functions");
const email_functions_1 = require("../../utils/helper_functions/email-functions");
const token_functions_1 = require("../../utils/helper_functions/token-functions");
const requestPasswordResetController = async (req, res, next) => {
    try {
        const value = userSchema_1.forgotPasswordSchema.safeParse(req.body);
        if (!value.success)
            return res.status(400).json({
                error: value.error.format()
            });
        const { email } = value.data;
        const user = await user_functions_1.default.checkUserWithEmail(email);
        if (!user)
            return res.status(404).json({
                error: "User not found"
            });
        const user_id = user.user_id;
        const resetToken = (0, token_functions_1.generateResetTokenString)(user_id);
        await (0, redis_functions_1.storeTempInRedis)("reset:token", resetToken);
        await (0, email_functions_1.sendPasswordResetEmail)(user.email);
        res.status(201).json({
            success: true,
            message: "Your password reset email has been sent to you."
        });
    }
    catch (error) {
        next(error);
    }
};
exports.default = requestPasswordResetController;
