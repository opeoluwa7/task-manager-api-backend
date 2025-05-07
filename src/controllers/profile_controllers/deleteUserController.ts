import { NextFunction, Request, Response } from "express";
import { blacklistToken } from "../../utils/helper_functions/redis-functions";
import userFn from "../../utils/helper_functions/user-functions";


const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id: number = req.user?.user_id;

        const result = await userFn.deleteUserInfo(user_id);

        if (!result) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const accessToken = req.cookies['access_token'];
        const refreshToken = req.cookies['refresh_token'];

        await blacklistToken(accessToken);
        await blacklistToken(refreshToken)

        res.clearCookie("access-token", {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });

        res.clearCookie("refresh-token", {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/api/refresh-token'
        });

        res.status(200).json({ 
            success: true,
            message: "User deleted successfully" 
        });
    } catch (error) {
        next(error);
    }
};


export default deleteUserController
