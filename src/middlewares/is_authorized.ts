import { Request, Response, NextFunction } from "express";
require("cookie-parser");
import {verifyAccessToken} from "../utils/jwt";
import redis from "../utils/redis"

const isAuthorized = {
    check: async (req: Request, res: Response, next: NextFunction) => {
        try {


            const access_token = req.cookies['accessToken'];

            if (!access_token) return res.status(401).json({
                error: "No Access Token found. please login"
            })

            const isBlacklisted = await redis.get(access_token);

            if (isBlacklisted) {
                return res.status(401).json({
                    success: false,
                    error: "Token is blacklisted. Please login again"
                })
            }


            const decoded = verifyAccessToken(access_token);
                
            if (!decoded) {
                return res.status(401).json({
                    success: false,
                    error: 'Invalid access token provided. Please login again'
                });

            }

            decoded.user_id = Number(decoded.user_id);

            req.user = decoded;

            next();
        } catch (error) {
            next(error)
        }
    }
}

export default isAuthorized
