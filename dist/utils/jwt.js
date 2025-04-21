"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyVerificationToken = exports.verifyResetToken = exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateVerificationToken = exports.generateResetToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const ACCESS_TOKEN_SECRET = env_1.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXP = env_1.env.ACCESS_TOKEN_EXP;
const REFRESH_TOKEN_SECRET = env_1.env.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXP = env_1.env.REFRESH_TOKEN_EXP;
const RESET_TOKEN_SECRET = env_1.env.RESET_TOKEN_SECRET;
const RESET_TOKEN_EXP = env_1.env.RESET_TOKEN_EXP;
const VERIFICATION_TOKEN_SECRET = env_1.env.VERIFICATION_TOKEN_SECRET;
const VERIFICATION_TOKEN_EXP = env_1.env.VERIFICATION_TOKEN_EXP;
const generateAccessToken = (user_id) => {
    const payload = {
        user_id
    };
    return jsonwebtoken_1.default.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXP
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (user_id) => {
    const payload = {
        user_id
    };
    return jsonwebtoken_1.default.sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXP
    });
};
exports.generateRefreshToken = generateRefreshToken;
const generateResetToken = (user_id) => {
    const payload = {
        user_id
    };
    return jsonwebtoken_1.default.sign(payload, RESET_TOKEN_SECRET, {
        expiresIn: RESET_TOKEN_EXP
    });
};
exports.generateResetToken = generateResetToken;
const generateVerificationToken = (email) => {
    const payload = {
        email
    };
    return jsonwebtoken_1.default.sign(payload, VERIFICATION_TOKEN_SECRET, {
        expiresIn: VERIFICATION_TOKEN_EXP
    });
};
exports.generateVerificationToken = generateVerificationToken;
const verifyAccessToken = (token) => {
    return jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_SECRET);
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    return jsonwebtoken_1.default.verify(token, REFRESH_TOKEN_SECRET);
};
exports.verifyRefreshToken = verifyRefreshToken;
const verifyResetToken = (token) => {
    return jsonwebtoken_1.default.verify(token, RESET_TOKEN_SECRET);
};
exports.verifyResetToken = verifyResetToken;
const verifyVerificationToken = (token) => {
    return jsonwebtoken_1.default.verify(token, VERIFICATION_TOKEN_SECRET);
};
exports.verifyVerificationToken = verifyVerificationToken;
