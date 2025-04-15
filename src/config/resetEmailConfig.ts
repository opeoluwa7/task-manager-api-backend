import nodemailer from "nodemailer";
import { env } from "./env";


const transporter = nodemailer.createTransport({
    host: env.EMAIL_HOST,
    port: Number(env.EMAIL_PORT),
    secure: env.EMAIL_SECURE === "true",
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS
    }
});

const sendPasswordResetEmail = async(userEmail: string, resetToken: string) => {
    const resetLink = `task-manager-api/reset-password/link?token=${resetToken}`;

    const mailOptions = {
        from: `Task manager API <${env.EMAIL_USER}>`,
        to: userEmail,
        subject: 'Password reset request.', 
        text: `Click the link below to reset your password:\n\n${resetLink}`,
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    };

    await transporter.sendMail(mailOptions);
}
export = sendPasswordResetEmail
