"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
const sendPasswordResetEmail = async (userEmail, resetToken) => {
    const resetLink = `task-manager-api/reset-password/link?token=${resetToken}`;
    const mailOptions = {
        from: `Task manager API <${env_1.env.EMAIL_USER}>`,
        to: userEmail,
        subject: 'Password reset request.',
        text: `Click the link below to reset your password:\n\n${resetLink}`,
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    };
    await transporter.sendMail(mailOptions);
};
module.exports = sendPasswordResetEmail;
