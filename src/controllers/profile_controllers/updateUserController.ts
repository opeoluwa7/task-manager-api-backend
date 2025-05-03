import { NextFunction, Request, Response } from "express";
import { updateUserSchema } from "../../schemas/userSchema";
import userFn from "../../utils/helper_functions/user-functions";
import { encryptedPassword } from "../../utils/helper_functions/bcrypt-functions";

import { generateAccessTokenString, generateRefreshTokenString } from "../../utils/helper_functions/token-functions";
import ms from "ms";
import { blacklistToken } from "../../utils/helper_functions/redis-functions";

const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id: number = req.user?.user_id;

        const value = updateUserSchema.safeParse(req.body)

        if (!value.success) return res.status(400).json({
            success: false,
            error: value.error.format()
        })

        const { email: newEmail, password: newPassword, name: newName } = value.data;

        const user = await userFn.checkUserWithId(user_id);
        const existingEmail = await userFn.checkUserWithEmail(newEmail!);

        if (existingEmail) return res.status(400).json({
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

        if (newEmail && newEmail !== currentEmail) {

            currentEmail = newEmail


            const accessToken = req.cookies['access_token'];
            const refreshToken = req.cookies['refresh_token'];

            await blacklistToken(accessToken);
            await blacklistToken(refreshToken)

            res.clearCookie('access_token', {
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            })

            res.clearCookie('refresh_token', {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                path: "api/refresh-token"
            })

            const newAccessToken: string = generateAccessTokenString(user_id);
            const newRefreshToken: string = generateRefreshTokenString(user_id)

            res.cookie('access_token', newAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: ms('10m')
            })

            res.cookie('refresh_token', newRefreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                path: "api/refresh-token",
                maxAge: ms('3d')
            })

        } else {
            return currentEmail
        }

        const password = newPassword && newPassword !== currentPassword ? await encryptedPassword(newPassword) : currentPassword;

        const name =  newName && newName !== currentName ? currentName = newName : currentName 



        const results = await userFn.updateUserInfo(name, currentEmail, password, user_id);

        delete results.password;

        res.status(200).json({ 
            success: true,
            updatedUser: results
        });
    } catch (error) {
        next(error)
    }
}

export default updateUserController
