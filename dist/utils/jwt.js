"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blacklistToken = exports.verifyResetToken = exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateResetToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = __importDefault(require("./redis"));
const env_1 = require("../config/env");
const JWTSECRET = env_1.env.JWTSECRET;
const JWTEXPTIME = env_1.env.JWTEXPTIME;
const JWT_REFRESH_SECRET = env_1.env.JWT_REFRESH_SECRET;
const JWT_REFRESH_EXP_TIME = env_1.env.JWT_REFRESH_EXP_TIME;
const RESET_TOKEN_SECRET = env_1.env.RESET_TOKEN_SECRET;
const RESET_TOKEN_EXP = env_1.env.RESET_TOKEN_EXP;
const generateAccessToken = (user_id) => {
    const payload = {
        user_id
    };
    return jsonwebtoken_1.default.sign(payload, JWTSECRET, {
        expiresIn: JWTEXPTIME
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (user_id) => {
    const payload = {
        user_id
    };
    return jsonwebtoken_1.default.sign(payload, JWT_REFRESH_SECRET, {
        expiresIn: JWT_REFRESH_EXP_TIME
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
const verifyAccessToken = (token) => {
    return jsonwebtoken_1.default.verify(token, JWTSECRET);
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    return jsonwebtoken_1.default.verify(token, JWT_REFRESH_SECRET);
};
exports.verifyRefreshToken = verifyRefreshToken;
const verifyResetToken = (token) => {
    return jsonwebtoken_1.default.verify(token, RESET_TOKEN_SECRET);
};
exports.verifyResetToken = verifyResetToken;
const blacklistToken = (token, expiry = JWTEXPTIME) => {
    const blacklist = redis_1.default.set(token, 'blacklisted', { EX: expiry });
    return blacklist;
};
exports.blacklistToken = blacklistToken;
