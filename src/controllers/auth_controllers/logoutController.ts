require("cookie-parser")
import { Response, Request, NextFunction } from "express";
import { blacklistToken } from "../../utils/helper_functions/redis-functions";


const logoutController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies['accessToken'];
        const refreshToken = req.cookies['refreshToken'];

        await blacklistToken(accessToken)
        await blacklistToken(refreshToken);


        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: "/api/refresh-token"
        })

        res.status(200).json({
            success: true,
            message: "User logged out successfully!"
        })

    } catch (error) {
        next(error)
    }
}

export default logoutController



