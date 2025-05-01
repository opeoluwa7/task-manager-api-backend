import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../config/env";



const ACCESS_TOKEN_SECRET = env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXP = env.ACCESS_TOKEN_EXP;
const REFRESH_TOKEN_SECRET =env.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXP = env.REFRESH_TOKEN_EXP;
const RESET_TOKEN_SECRET= env.RESET_TOKEN_SECRET;
const RESET_TOKEN_EXP = env.RESET_TOKEN_EXP;
const VERIFICATION_TOKEN_SECRET = env.VERIFICATION_TOKEN_SECRET;
const VERIFICATION_TOKEN_EXP = env.VERIFICATION_TOKEN_EXP;

export const generateAccessToken = (user_id: number) => {
    
    type tokenPayload = {
        user_id: number
    } 

    const payload: tokenPayload = {
        user_id
    };

    return jwt.sign(
        payload,
        ACCESS_TOKEN_SECRET as string,
        {
            expiresIn: ACCESS_TOKEN_EXP
        } as jwt.SignOptions
    )
}

export const generateRefreshToken = (user_id: number) => {
    
    type refreshTokenPayload = {
        user_id: number
    }

    const payload: refreshTokenPayload = {
        user_id
    }

    return jwt.sign(
        payload,
        REFRESH_TOKEN_SECRET as string,
        {
            expiresIn: REFRESH_TOKEN_EXP
        } as jwt.SignOptions
    )
}

export const generateResetToken = (user_id: number) => {
    
    type resetTokenPayload = {
        user_id: number
    }

    const payload: resetTokenPayload = {
        user_id 
    }

    return jwt.sign(
        payload,
        RESET_TOKEN_SECRET as string,
        {
            expiresIn: RESET_TOKEN_EXP
        } as jwt.SignOptions
    )
}

export const generateVerificationToken = (email: string) => {

    type resetTokenPayload = {
        email: string
    }

    const payload: resetTokenPayload = {
        email
    }

    return jwt.sign(
        payload,
        VERIFICATION_TOKEN_SECRET as string,
        {
            expiresIn: VERIFICATION_TOKEN_EXP
        } as jwt.SignOptions
    )
}



export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, ACCESS_TOKEN_SECRET as string) as JwtPayload
}

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, REFRESH_TOKEN_SECRET as string) as JwtPayload
}

export const verifyResetToken = (token: string) => {
    return jwt.verify(token, RESET_TOKEN_SECRET as string) as JwtPayload
}

export const verifyVerificationToken = (token: string) => {
    return jwt.verify(token, VERIFICATION_TOKEN_SECRET as string) as JwtPayload
}




