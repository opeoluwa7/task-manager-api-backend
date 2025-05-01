"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPasswordResetEmail = exports.sendVerificationEmail = void 0;
const emailConfig_1 = require("../../config/emailConfig");
const sendVerificationEmail = async (email) => {
    const link = (0, emailConfig_1.sendEmailVerificationLink)(email);
    return link;
};
exports.sendVerificationEmail = sendVerificationEmail;
const sendPasswordResetEmail = async (email) => {
    const link = (0, emailConfig_1.sendPasswordResetEmailLink)(email);
    return link;
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
