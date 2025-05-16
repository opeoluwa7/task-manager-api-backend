require("cookie-parser")
import { blacklistToken } from "../../utils/helper_functions/redis-functions";
import { accessCookie, refreshCookie } from "../../global/variables";
import { Express } from "../../types/express/types";



const logoutController = async (express: Express) => {
    try {
        const accessToken = express.req.cookies['access_token'];
        const refreshToken = express.req.cookies['refresh_token'];

        await blacklistToken(accessToken);
        await blacklistToken(refreshToken)


        express.res.clearCookie('access_token', accessCookie)

        express.res.clearCookie('refresh_token', refreshCookie)

        express.res.status(200).json({
            success: true,
            message: "User logged out successfully!"
        })

    } catch (error) {
        express.next(error)
    }
}

export default logoutController



