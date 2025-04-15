import jwt, { JwtPayload } from "jsonwebtoken";
import redis from "./redis";
import { env } from "../config/env";



const JWTSECRET = env.JWTSECRET;
const JWTEXPTIME = env.JWTEXPTIME;
const JWT_REFRESH_SECRET =env.JWT_REFRESH_SECRET;
const JWT_REFRESH_EXP_TIME = env.JWT_REFRESH_EXP_TIME;

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

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, JWTSECRET as string) as JwtPayload
}

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, JWT_REFRESH_SECRET as string) as JwtPayload
}

export const blacklistToken = (token: string, expiry = JWTEXPTIME) => {
    const blacklist = redis.set(token, 'blacklisted', { EX: expiry} as any);
     
    return blacklist;
}


