import { NextFunction, Request, Response } from "express";
import { storeTempInRedis } from "../../utils/helper_functions/redis-functions";
import userFn from "../../utils/helper_functions/user-functions";



const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id: number = req.user?.user_id;

        const result = await userFn.deleteUserInfo(user_id);

        if (!result) {
            return res.status(500).json({
                success: false,
                message: "Error deleting user. Try again"
            })
        }

        const access_token = req.cookies['accessToken'];
        const refresh_token = req.cookies['refreshToken'];

        await storeTempInRedis(access_token, "blacklisted");
        await storeTempInRedis(refresh_token, "blacklisted")

        res.clearCookie("access-token", {
            httpOnly: true,
            secure: false,
            sameSite: 'none'
        });

        res.clearCookie("refresh-token", {
            httpOnly: true,
            secure: false,
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
