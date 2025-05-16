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
const resetPasswordController = async (express) => {
    try {
        const value = userSchema_1.resetPasswordSchema.safeParse(express.req.body);
        if (!value.success)
            return express.res.status(400).json({
                error: value.error.format()
            });
        const { password } = value.data;
        const resetToken = await (0, redis_functions_1.getFromRedis)("reset:token");
        if (!resetToken)
            return express.res.status(401).json({
                error: "No reset token provided. Go back to forgot password"
            });
        const verified = (0, token_functions_1.verifyResetTokenString)(resetToken);
        if (!verified)
            return express.res.status(401).json({
                error: "Invalid reset token. go back to forgot password"
            });
        const { name, email, password: storedHashedPassword, user_id } = await user_functions_1.default.checkUserWithId(verified.user_id);
        const match = await (0, bcrypt_functions_1.matchPasswords)(password, storedHashedPassword);
        if (match)
            return express.res.status(400).json({
                error: "Passwords must not match. change it for better security."
            });
        const hashedPassword = await (0, bcrypt_functions_1.encryptedPassword)(password);
        const updatePassword = {
            name: name,
            email: email,
            password: hashedPassword,
            user_id: user_id
        };
        const results = await user_functions_1.default.updateUserInfo(updatePassword);
        if (!results)
            return express.res.status(500).json({
                success: false,
                error: "Internal Server Error"
            });
        express.res.status(200).json({
            success: true,
            message: "Password reset successful!"
        });
    }
    catch (error) {
        express.next(error);
    }
};
exports.default = resetPasswordController;
