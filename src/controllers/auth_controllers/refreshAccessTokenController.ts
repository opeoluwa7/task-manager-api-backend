import { generateAccessTokenString, verifyRefreshTokenString } from "../../utils/helper_functions/token-functions";
import { accessCookie } from "../../global/variables";
import { Express } from "../../types/express/types";


const refreshAccessTokenController = async(express: Express) => {
    try {

        const token = express.req.cookies["refresh_token"];

        const refreshToken = verifyRefreshTokenString(token)

        const user_id = refreshToken.user_id;

        const newAccessToken = generateAccessTokenString(user_id);


        express.res.clearCookie('access_token', accessCookie);

        express.res.cookie('access_token', newAccessToken, accessCookie)

        return express.res.status(201).json({
            success: true,
            message: "Token refreshed successfully"
        })
    } catch (err) {
        express.next(err)
    }
}

export default refreshAccessTokenController

