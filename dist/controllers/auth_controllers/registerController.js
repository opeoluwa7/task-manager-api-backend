"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userSchema_1 = require("../../schemas/userSchema");
const redis_functions_1 = require("../../utils/helper_functions/redis-functions");
const token_functions_1 = require("../../utils/helper_functions/token-functions");
const user_functions_1 = __importDefault(require("../../utils/helper_functions/user-functions"));
const bcrypt_functions_1 = require("../../utils/helper_functions/bcrypt-functions");
const email_functions_1 = require("../../utils/helper_functions/email-functions");
const registerController = async (req, res, next) => {
    try {
        const value = userSchema_1.registerSchema.safeParse(req.body);
        if (!value.success) {
            return res.status(400).json({
                error: value.error.format()
            });
        }
        const { name, email, password } = value.data;
        const user = {
            email: email
        };
        const existingUser = await user_functions_1.default.checkUserWithEmail(user);
        if (existingUser)
            return res.status(400).json({
                error: "User with this email already exists"
            });
        const hashedPassword = await (0, bcrypt_functions_1.encryptedPassword)(password);
        const verificationToken = (0, token_functions_1.generateVerificationTokenString)(email);
        await (0, redis_functions_1.storeTempInRedis)("name", name);
        await (0, redis_functions_1.storeTempInRedis)("email", email);
        await (0, redis_functions_1.storeTempInRedis)("password", hashedPassword);
        await (0, redis_functions_1.storeTempInRedis)("verification:token", verificationToken);
        await (0, email_functions_1.sendVerificationEmail)(email);
        res.status(200).json({
            success: true,
            message: "An Email Verification link has been sent to you. Please verify"
        });
    }
    catch (error) {
        next(error);
    }
};
exports.default = registerController;
