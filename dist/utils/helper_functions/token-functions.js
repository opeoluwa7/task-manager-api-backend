"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyResetTokenString = exports.generateResetTokenString = exports.verifyVerificationTokenString = exports.generateVerificationTokenString = exports.verifyRefreshTokenString = exports.generateRefreshTokenString = exports.verifyAccessTokenString = exports.generateAccessTokenString = void 0;
const jwt_1 = require("../jwt");
const generateAccessTokenString = (user_id) => {
    const token = (0, jwt_1.generateAccessToken)(user_id);
    return token;
};
exports.generateAccessTokenString = generateAccessTokenString;
const verifyAccessTokenString = (token) => {
    const verified = (0, jwt_1.verifyAccessToken)(token);
    return verified;
};
exports.verifyAccessTokenString = verifyAccessTokenString;
const generateRefreshTokenString = (user_id) => {
    const token = (0, jwt_1.generateRefreshToken)(user_id);
    return token;
};
exports.generateRefreshTokenString = generateRefreshTokenString;
const verifyRefreshTokenString = (token) => {
    const verified = (0, jwt_1.verifyRefreshToken)(token);
    return verified;
};
exports.verifyRefreshTokenString = verifyRefreshTokenString;
const generateVerificationTokenString = (email) => {
    const token = (0, jwt_1.generateVerificationToken)(email);
    return token;
};
exports.generateVerificationTokenString = generateVerificationTokenString;
const verifyVerificationTokenString = (token) => {
    const verified = (0, jwt_1.verifyVerificationToken)(token);
    return verified;
};
exports.verifyVerificationTokenString = verifyVerificationTokenString;
const generateResetTokenString = (user_id) => {
    const token = (0, jwt_1.generateResetToken)(user_id);
    return token;
};
exports.generateResetTokenString = generateResetTokenString;
const verifyResetTokenString = (token) => {
    const verified = (0, jwt_1.verifyResetToken)(token);
    return verified;
};
exports.verifyResetTokenString = verifyResetTokenString;
