import { generateAccessToken, generateRefreshToken, generateResetToken, generateVerificationToken, verifyAccessToken, verifyRefreshToken, verifyResetToken, verifyVerificationToken } from "../jwt";


export const generateAccessTokenString = (user_id: number)  => {
    const token = generateAccessToken(user_id);

    return token
}

export const verifyAccessTokenString = (token: string) => {
    const verified = verifyAccessToken(token);

    return verified;
}


export const generateRefreshTokenString = (user_id: number)  => {
    const token = generateRefreshToken(user_id);

    return token
}

export const verifyRefreshTokenString = (token: string) => {
    const verified = verifyRefreshToken(token);

    return verified;
}


export const generateVerificationTokenString = (email: string)  => {
    const token = generateVerificationToken(email);

    return token
}

export const verifyVerificationTokenString = (token: string) => {
        const verified = verifyVerificationToken(token);

        return verified;
}

export const generateResetTokenString = (user_id: number)  => {
    const token = generateResetToken(user_id);

    return token
}

export const verifyResetTokenString = (token: string) => {
    const verified = verifyResetToken(token);

    return verified;
}


