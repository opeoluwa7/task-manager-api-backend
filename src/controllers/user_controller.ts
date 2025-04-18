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

        if (!value.success) {
            return res.status(400).json({
                success: false,
                error: value.error.format()
            })
        }

        const { email: newEmail, password: newPassword, name } = value.data;

        const user = await userQueries.getUserAfterAuth(user_id);
        const existingUser = await authQueries.getUserDetails(newEmail!);

        if (existingUser) return res.status(400).json({
            success: false,
            error: "This email is not available."
        })

        if (!user) return res.status(404).json({
            success: false,
            error: "User not found"
        })

        let currentEmail = user.email;
        let currentName = user.name;
        const currentPassword = user.password;

     
        if (newEmail && newEmail !== currentEmail) {

            currentEmail = newEmail 

         }

        const encryptedPassword = newPassword && newPassword !== currentPassword ? await encryptPassword(newPassword) : currentPassword;

        if (name && name !== currentName) { 
            currentName = name 
        }



        const results = await userQueries.updateUser(currentName, currentEmail, encryptedPassword, user_id);

        const access_token = req.cookies['accessToken'];

        const expiresIn: number = 900;
            
        await redis.setex(access_token, expiresIn, "blacklisted");

        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })

        const newAccessToken: string = generateAccessToken(user_id);

        console.log(user_id);

        console.log("Access token:", newAccessToken);



        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })

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
