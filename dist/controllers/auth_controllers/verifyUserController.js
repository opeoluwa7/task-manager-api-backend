"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_functions_1 = require("../../utils/helper_functions/redis-functions");
const token_functions_1 = require("../../utils/helper_functions/token-functions");
const user_functions_1 = __importDefault(require("../../utils/helper_functions/user-functions"));
const verifyUserController = async ({ req, res, next }) => {
    try {
        const token = await (0, redis_functions_1.getFromRedis)("verification:token");
        const verificationToken = (0, token_functions_1.verifyVerificationTokenString)(token);
        if (!verificationToken)
            return res.status(400).json({
                error: "Invalid verification token. Please register"
            });
        const name = await (0, redis_functions_1.getFromRedis)("name");
        const email = await (0, redis_functions_1.getFromRedis)("email");
        const password = await (0, redis_functions_1.getFromRedis)("password");
        const isVerified = true;
        const user = {
            name: name,
            email: email,
            password: password,
            isVerified: isVerified
        };
        const results = await user_functions_1.default.createUser(user);
        if (!results)
            return res.status(500).json({
                error: "Error creating user"
            });
        res.status(201).send("<h1> User verified successfully!. You can now login </h1>");
    }
    catch (error) {
        next(error);
    }
};
exports.default = verifyUserController;
