require("cookie-parser")
import { blacklistToken } from "../../utils/helper_functions/redis-functions";
import { accessCookie, refreshCookie } from "../../global/variables";
import { Express } from "../../types/express/types";



const logoutController = async ({req, res, next}: Express) => {
    try {
        const accessToken = req.cookies['access_token'];
        const refreshToken = req.cookies['refresh_token'];

        await blacklistToken(accessToken);
        await blacklistToken(refreshToken)


        res.clearCookie('access_token', accessCookie)

        res.clearCookie('refresh_token', refreshCookie)

        res.status(200).json({
            success: true,
            message: "User logged out successfully!"
        })

    } catch (error) {
        next(error)
    }
}

export default logoutController



