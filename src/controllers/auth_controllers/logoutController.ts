require("cookie-parser")
import { Response, Request, NextFunction } from "express";
import { blacklistToken } from "../../utils/helper_functions/redis-functions";


const logoutController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken: string = req.cookies['accessToken'];
        const refreshToken: string = req.cookies['refreshToken'];


        if (!accessToken) return res.status(401).json({
            success: false,
            error: "Token not found. Please login again"
        })

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



