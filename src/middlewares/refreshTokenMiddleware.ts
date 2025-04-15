import jwt from "jsonwebtoken";
require("cookie-parser");
import redis from "../utils/redis";
import { Request, Response, NextFunction } from "express";
import { verifyRefreshToken } from "../utils/jwt";

const refreshTokenMiddlware = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const refresh_token = req.cookies['refreshToken'];

        if (!refresh_token) {
            return res.status(401).json({
                success: false,
                error: "No refresh token provided. Please login"
            })
        }

        const blacklisted = await redis.get(refresh_token);

        if (blacklisted) {
            return res.status(401).json({
                success: false,
                error: "Token is blacklisted. Please login again"
            })
        }

        const decoded = verifyRefreshToken(refresh_token);

        if (!decoded) return res.status(401).json({
            success: false,
            error: "Invalid refresh token provided. Please login again."
        })

        decoded.user_id = Number(decoded.user_id)

        req.user = decoded;
        next()
    } catch(error) {
        next(error)
    }
}

export default refreshTokenMiddlware
