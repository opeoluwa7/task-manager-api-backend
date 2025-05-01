import { sendEmailVerificationLink, sendPasswordResetEmailLink } from "../../config/emailConfig"


export const sendVerificationEmail = async (email: string) => {
    const link = sendEmailVerificationLink(email)

    return link
}

export const sendPasswordResetEmail = async (email: string) => {
    const link = sendPasswordResetEmailLink(email)

    return link
}
