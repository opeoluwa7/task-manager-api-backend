
require("cookie-parser");
import { checkRedisBlacklist } from "../utils/helper_functions/redis-functions";
import { Express } from "../types/express/types";

import { verifyRefreshTokenString } from "../utils/helper_functions/token-functions";

const refreshTokenMiddlware = async(express: Express) => {
    try {
        const refreshToken = express.req.cookies['refresh_token'];

        if (!refreshToken) {
            return express.res.status(401).json({
                error: "No refresh token provided. Please login"
            })
        }

        const blacklisted = await checkRedisBlacklist(refreshToken);

        if (blacklisted) {
            return express.res.status(401).json({
                error: "Token is blacklisted. Please login again"
            })
        }

        const decoded = verifyRefreshTokenString(refreshToken);

        if (!decoded) return express.res.status(401).json({
            error: "Invalid refresh token provided. Please login again."
        })
        

        express.req.user = decoded;

        express.next()
    } catch(error) {
        express.next(error)
    }
}

export default refreshTokenMiddlware
