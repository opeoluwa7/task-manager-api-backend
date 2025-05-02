"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userSchema_1 = require("../../schemas/userSchema");
const bcrypt_functions_1 = require("../../utils/helper_functions/bcrypt-functions");
const user_functions_1 = __importDefault(require("../../utils/helper_functions/user-functions"));
const token_functions_1 = require("../../utils/helper_functions/token-functions");
const redis_functions_1 = require("../../utils/helper_functions/redis-functions");
const resetPasswordController = async (req, res, next) => {
    try {
        const value = userSchema_1.resetPasswordSchema.safeParse(req.body);
        if (!value.success)
            return res.status(400).json({
                success: false,
                error: value.error.format()
            });
        const { password } = value.data;
        const resetToken = await (0, redis_functions_1.getFromRedis)("reset:token");
        if (!resetToken)
            return res.status(401).json({
                success: false,
                error: "No reset token provided. Go back to forgot password"
            });
        const verified = (0, token_functions_1.verifyResetTokenString)(resetToken);
        if (!verified)
            return res.status(401).json({
                error: "Invalid reset token. go back to forgot password"
            });
        const user = await user_functions_1.default.checkUserWithId(verified.user_id);
        const storedHashedPassword = user.password;
        const match = await (0, bcrypt_functions_1.matchPasswords)(password, storedHashedPassword);
        if (match)
            return res.status(400).json({
                success: false,
                error: "Passwords must not match. change it for better security."
            });
        const hashedPassword = await (0, bcrypt_functions_1.encryptedPassword)(password);
        const results = await user_functions_1.default.updateUserInfo(user.name, user.email, hashedPassword, user.user_id);
        if (!results)
            return res.status(500).json({
                success: false,
                error: "Internal Server Error"
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
exports.default = resetPasswordController;
