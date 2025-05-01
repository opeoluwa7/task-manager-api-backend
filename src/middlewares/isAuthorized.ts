import { Request, Response, NextFunction } from "express";
require("cookie-parser");
import { getFromRedis } from "../utils/helper_functions/redis-functions"
import { verifyAccessTokenString } from "../utils/helper_functions/token-functions";

const isAuthorized = {
    check: async (req: Request, res: Response, next: NextFunction) => {
        try {


            const accessToken = req.cookies['accessToken'];

            if (!accessToken) return res.status(401).json({
                error: "No Access Token found. please login"
            })

            const isBlacklisted = await getFromRedis(accessToken);

            if (isBlacklisted) {
                return res.status(401).json({
                    success: false,
                    error: "Token is blacklisted. Please login again"
                })
            }


            const decoded = verifyAccessTokenString(accessToken);
                
            if (!decoded) {
                return res.status(401).json({
                    success: false,
                    error: 'Invalid access token provided. Please login again'
                });
            }

        

            req.user = decoded;

            next();
        } catch (error) {
            next(error)
        }
    }
}

export default isAuthorized
