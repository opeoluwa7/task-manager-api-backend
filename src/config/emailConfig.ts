import nodemailer from "nodemailer";
import { env } from "./env";


const transporter = nodemailer.createTransport({
    host: env.EMAIL_HOST,
    port: Number(env.EMAIL_PORT),
    secure: true,
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS
    }
});

const sendEmailVerificationLink = async(userEmail: string) => {
    const verificationLink = `https://task-manager-api-2025.up.railway.app/api/verify-email`;

    const mailOptions = {
        from: `Task manager API <${env.EMAIL_USER}>`,
        to: userEmail,
        subject: 'Verify your email to login',
        text: `Click the link below to reset your password:\n\n${verificationLink}`,
        html: `<p>Click <a href="${verificationLink}">here</a> to verify your email. </p>`
    }

    await transporter.sendMail(mailOptions);
}


const sendPasswordResetEmail = async(userEmail: string) => {
    const resetLink = `https://task-manager-api-2025.up.railway.app/api/reset-password`;

    const mailOptions = {
        from: `Task manager API <${env.EMAIL_USER}>`,
        to: userEmail,
        subject: 'Password reset request.', 
        text: `Click the link below to reset your password:\n\n${resetLink}`,
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    };

    await transporter.sendMail(mailOptions);
}

export  {
    sendEmailVerificationLink,
    sendPasswordResetEmail
}
