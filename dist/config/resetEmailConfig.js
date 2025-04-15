"use strict";
const nodemailer = require("nodemailer");
const env = require("./env.js");
const transporter = nodemailer.createTransport({
    service: env.EMAIL_SERVICE,
    host: env.EMAIL_HOST,
    port: env.EMAIL_PORT,
    secure: env.SECURE,
    auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS
    }
});
const sendPasswordResetEmail = async (userEmail, resetToken) => {
    const resetLink = `task-manager-api/reset-password/link?token=${resetToken}`;
    const mailOptions = {
        from: `Task manager API <${env.EMAIL_USER}>`,
        to: userEmail,
        subject: 'Password reset request.',
        text: `Click the link below to reset your password:\n\n${resetLink}`,
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    };
    await transporter.sendMail(mailOptions);
};
module.exports = sendPasswordResetEmail;
