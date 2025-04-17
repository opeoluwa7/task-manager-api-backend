import jwt, { JwtPayload } from "jsonwebtoken";
import redis from "./redis";
import { env } from "../config/env";



const JWTSECRET = env.JWTSECRET;
const JWTEXPTIME = env.JWTEXPTIME;
const JWT_REFRESH_SECRET =env.JWT_REFRESH_SECRET;
const JWT_REFRESH_EXP_TIME = env.JWT_REFRESH_EXP_TIME;
const RESET_TOKEN_SECRET= env.RESET_TOKEN_SECRET;
const RESET_TOKEN_EXP = env.RESET_TOKEN_EXP;

export const generateAccessToken = (user_id: number) => {
    
    type tokenPayload = {
        user_id: number
    } 

    const payload: tokenPayload = {
        user_id
    };

    return jwt.sign(
        payload,
        JWTSECRET as string,
        {
            expiresIn: JWTEXPTIME
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
        JWT_REFRESH_SECRET as string,
        {
            expiresIn: JWT_REFRESH_EXP_TIME
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

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, JWTSECRET as string) as JwtPayload
}

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, JWT_REFRESH_SECRET as string) as JwtPayload
}

export const verifyResetToken = (token: string) => {
    return jwt.verify(token, RESET_TOKEN_SECRET as string) as JwtPayload
}

export const blacklistToken = (token: string, expiry = JWTEXPTIME) => {
    const blacklist = redis.set(token, 'blacklisted', { EX: expiry} as any);
     
    return blacklist;
}


