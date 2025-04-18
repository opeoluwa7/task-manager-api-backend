import userQueries from "../config/db_queries/user_queries";
import { updateUserSchema } from "../schemas/user_schema"; 
import { encryptPassword } from "../utils/bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { Request, Response, NextFunction } from "express";
import redis from "../utils/redis";
import { authQueries } from "../config/db_queries/auth_queries";


const findUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id: number = req.user?.user_id;
        const user = await userQueries.getUserAfterAuth(user_id);

        if (!user) return res.status(404).json({
            success: false,
            error: "User not found"
        })

        res.status(200).json({
            success: true,
            user: {
                user_id: user.user_id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id: Number = req.user?.user_id;

        const value = updateUserSchema.safeParse(req.body)

        if (!value.success) return res.status(400).json({
                success: false,
                error: value.error.format()
            })

        const { email: newEmail, password: newPassword, name: newName } = value.data;

        const user = await userQueries.getUserAfterAuth(user_id);
        const existingUser = await authQueries.getUserDetails(newEmail!);

        if (existingUser) return res.status(400).json({
            success: false,
            error: "This email is not available. Try another one."
        })

        if (!user) return res.status(404).json({
            success: false,
            error: "User not found"
        })

        let currentEmail: string = user.email;
        let currentName: string = user.name;
        const currentPassword: string = user.password;

     
        const email = newEmail && newEmail !== currentEmail ? currentEmail = newEmail : currentEmail 

        const password = newPassword && newPassword !== currentPassword ? await encryptPassword(newPassword) : currentPassword;

        const name =  newName && newName !== currentName ? currentName = newName : currentName 



        const results = await userQueries.updateUser(name, email, password, user_id);

        const access_token = req.cookies['accessToken'];
        const refresh_token = req.cookies['refreshToken'];

        const expiresIn: number = 900;
            
        await redis.setex(access_token, expiresIn, "blacklisted");
        await redis.setex(refresh_token, expiresIn, "blacklisted")

        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })

        res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: "api/refresh-token"
        })

        const newAccessToken: string = generateAccessToken(user_id);
        const newRefreshToken: string = generateRefreshToken(user_id)

        res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
        })

        res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: "api/refresh-token"
        })

        delete results.password;

        res.status(200).json({ 
            success: true,
            updatedUser: results
        });
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id = req.user?.user_id;

        const result = await userQueries.deleteUser(user_id);

        if (!result) {
            return res.status(500).json({
                success: false,
                message: "Error deleting user. Try again"
            })
        }
 
        const access_token = req.cookies['accessToken'];
        const refresh_token = req.cookies['refreshToken'];

        const expiresIn = 900
        await redis.setex(access_token, expiresIn, "blacklisted");
        await redis.setex(refresh_token, expiresIn, "blacklisted")

        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: false,
            sameSite: 'none'
        });

         res.clearCookie("refreshToken", {
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


export = {
    findUser,
    updateUser,
    deleteUser
}
