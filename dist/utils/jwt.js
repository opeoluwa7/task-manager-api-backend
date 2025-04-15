"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blacklistToken = exports.verifyToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = __importDefault(require("./redis"));
const env_1 = require("../config/env");
const JWTSECRET = env_1.env.JWTSECRET;
const JWTEXPTIME = env_1.env.JWTEXPTIME;
console.log('This is the jwt exp time:', JWTEXPTIME);
console.log(JWTSECRET);
const generateAccessToken = (email, user_id) => {
    const payload = {
        email,
        user_id
    };
    return jsonwebtoken_1.default.sign(payload, JWTSECRET, {
        expiresIn: JWTEXPTIME
    });
};
exports.generateAccessToken = generateAccessToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, JWTSECRET);
};
exports.verifyToken = verifyToken;
const blacklistToken = (token, expiry = JWTEXPTIME) => {
    const blacklist = redis_1.default.set(token, 'blacklisted', { EX: expiry });
    return blacklist;
};
exports.blacklistToken = blacklistToken;
