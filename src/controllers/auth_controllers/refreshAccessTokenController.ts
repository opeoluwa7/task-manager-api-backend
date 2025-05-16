import { Express } from "../../types/express/types";
import { generateAccessTokenString, verifyRefreshTokenString } from "../../utils/helper_functions/token-functions";
import { accessCookie } from "../../global/variables";


const refreshAccessTokenController = async({req, res, next}: Express) => {
    try {

        const token = req.cookies["refresh_token"];

        const refreshToken = verifyRefreshTokenString(token)

        const user_id = refreshToken.user_id;

        const newAccessToken = generateAccessTokenString(user_id);


        res.clearCookie('access_token', accessCookie);

        res.cookie('access_token', newAccessToken, accessCookie)

        return res.status(201).json({
            success: true,
            message: "Token refreshed successfully"
        })
    } catch (err) {
        next(err)
    }
}

export default refreshAccessTokenController

