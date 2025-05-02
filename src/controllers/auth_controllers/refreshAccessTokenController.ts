import { Request, Response, NextFunction } from "express";
import { generateAccessTokenString, verifyRefreshTokenString } from "../../utils/helper_functions/token-functions";
import ms from "ms";


const refreshAccessTokenController = async(req: Request, res: Response, next: NextFunction) => {
    try {

        const token = req.cookies["refresh_token"];

        const refreshToken = verifyRefreshTokenString(token)

        const user_id = refreshToken.user_id;

        const newAccessToken = generateAccessTokenString(user_id);


        res.clearCookie('access_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });

        res.cookie('access_token', newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: ms('10m')
        })

        return res.status(200).json({
            success: true,
            message: "Token refreshed successfully"
        })
    } catch (err) {
        next(err)
    }
}

export default refreshAccessTokenController

