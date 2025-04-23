"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPasswordResetEmail = exports.sendEmailVerificationLink = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("./env");
const transporter = nodemailer_1.default.createTransport({
    host: env_1.env.EMAIL_HOST,
    port: Number(env_1.env.EMAIL_PORT),
    secure: true,
    auth: {
        user: env_1.env.EMAIL_USER,
        pass: env_1.env.EMAIL_PASS
    }
});
const sendEmailVerificationLink = async (userEmail) => {
    const verificationLink = `https://task-manager-api-2025.up.railway.app/api/verify-email`;
    const mailOptions = {
        from: `Task manager API <${env_1.env.EMAIL_USER}>`,
        to: userEmail,
        subject: 'Verify your email to login',
        text: `Click the link below to reset your password:\n\n${verificationLink}`,
        html: `<p>Click <a href="${verificationLink}">here</a> to verify your email. </p>`
    };
    await transporter.sendMail(mailOptions);
};
exports.sendEmailVerificationLink = sendEmailVerificationLink;
const sendPasswordResetEmail = async (userEmail) => {
    const resetLink = `https://task-manager-app-frontend-blue.vercel.app/reset-password`;
    const mailOptions = {
        from: `Task manager API <${env_1.env.EMAIL_USER}>`,
        to: userEmail,
        subject: 'Password reset request.',
        text: `Click the link below to reset your password:\n\n${resetLink}`,
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    };
    await transporter.sendMail(mailOptions);
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
