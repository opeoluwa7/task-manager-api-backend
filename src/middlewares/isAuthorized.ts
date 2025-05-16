import { Express } from "../types/express/types"
require("cookie-parser");
import { checkRedisBlacklist } from "../utils/helper_functions/redis-functions"
import { verifyAccessTokenString } from "../utils/helper_functions/token-functions";

const isAuthorized = {
    check: async (express: Express) => {
        try {


            const accessToken: string  = express.req.cookies['access_token'];

            if (!accessToken) return express.res.status(401).json({
                error: "No Access Token found. please login"
            })

            const isBlacklisted = await checkRedisBlacklist(accessToken);

            if (isBlacklisted) {
                return express.res.status(401).json({
                    error: "Token is blacklisted. Please login again"
                })
            }


            const decoded = verifyAccessTokenString(accessToken);
                
            if (!decoded) {
                return express.res.status(401).json({
                    error: 'Invalid access token provided. Please login again'
                });
            }

        

            express.req.user = decoded;

            express.next();
        } catch (error) {
            express.next(error)
        }
    }
}

export default isAuthorized
