
require("cookie-parser");
import { RequestHandler } from "express";
import { checkRedisBlacklist } from "../utils/helper_functions/redis-functions"
import { verifyAccessTokenString } from "../utils/helper_functions/token-functions";

const isAuthorized: RequestHandler = async (req, res, next) => {
    try {
        const accessToken: string  = req.cookies['access_token'];

        if (!accessToken) return res.status(401).json({
            error: "No Access Token found. please login"
        })

        const isBlacklisted = await checkRedisBlacklist(accessToken);

        if (isBlacklisted) {
            return res.status(401).json({
                error: "Token is blacklisted. Please login again"
            })
        }


        const decoded = verifyAccessTokenString(accessToken);
            
        if (!decoded) {
            return res.status(401).json({
                error: 'Invalid access token provided. Please login again'
            });
        }

        req.user = decoded;

        next();
    } catch (error) {
        next(error)
    }
}

export default isAuthorized
