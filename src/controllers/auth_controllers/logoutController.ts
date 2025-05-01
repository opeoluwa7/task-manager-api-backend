require("cookie-parser")
import { Response, Request, NextFunction } from "express";
import { blacklistToken } from "../../utils/helper_functions/redis-functions";


const logoutController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const access_token: string = req.cookies['access-token'];
        const refresh_token: string = req.cookies['refresh-token'];


        if (!access_token) return res.status(401).json({
            success: false,
            error: "Token not found. Please login again"
        })

        await blacklistToken(access_token)
        await blacklistToken(refresh_token);


        res.clearCookie('access-token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })

        res.clearCookie('refresh-token', {
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



