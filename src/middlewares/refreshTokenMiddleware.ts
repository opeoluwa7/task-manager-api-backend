
require("cookie-parser");
import { RequestHandler } from "express";
import { checkRedisBlacklist } from "../utils/helper_functions/redis-functions";


import { verifyRefreshTokenString } from "../utils/helper_functions/token-functions";

const refreshTokenMiddlware: RequestHandler = async (req, res, next) => {
    try {
        const refreshToken = req.cookies['refresh_token'];

        if (!refreshToken) {
            return res.status(401).json({
                error: "No refresh token provided. Please login"
            })
        }

        const blacklisted = await checkRedisBlacklist(refreshToken);

        if (blacklisted) {
            return res.status(401).json({
                error: "Token is blacklisted. Please login again"
            })
        }

        const decoded = verifyRefreshTokenString(refreshToken);

        if (!decoded) return res.status(401).json({
            error: "Invalid refresh token provided. Please login again."
        })
        

        req.user = decoded;

        next()
    } catch(error) {
        next(error)
    }
}

export default refreshTokenMiddlware
