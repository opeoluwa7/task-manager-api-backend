
require("cookie-parser");
import { getFromRedis } from "../utils/helper_functions/redis-functions";
import { Request, Response, NextFunction } from "express";

import { verifyRefreshTokenString } from "../utils/helper_functions/token-functions";

const refreshTokenMiddlware = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies['refreshToken'];

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                error: "No refresh token provided. Please login"
            })
        }

        const blacklisted = await getFromRedis(refreshToken);

        if (blacklisted) {
            return res.status(401).json({
                success: false,
                error: "Token is blacklisted. Please login again"
            })
        }

        const decoded = verifyRefreshTokenString(refreshToken);

        if (!decoded) return res.status(401).json({
            success: false,
            error: "Invalid refresh token provided. Please login again."
        })
        

        req.user = decoded;
        next()
    } catch(error) {
        next(error)
    }
}

export default refreshTokenMiddlware
