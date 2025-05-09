import { NextFunction, Request, Response } from "express";
import { updateUserSchema } from "../../schemas/userSchema";
import userFn from "../../utils/helper_functions/user-functions";
import { encryptedPassword } from "../../utils/helper_functions/bcrypt-functions";

import { generateAccessTokenString, generateRefreshTokenString } from "../../utils/helper_functions/token-functions";
import ms from "ms";
import { blacklistToken } from "../../utils/helper_functions/redis-functions";
import CheckUserWithIdType from "../../types/userTypes/CheckUserWithIdType";
import CheckUserWithEmailType from "../../types/userTypes/CheckWithEmailType";
import UpdateUserType from "../../types/userTypes/UpdateUserType";

const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id: number = req.user?.user_id;

        const value = updateUserSchema.safeParse(req.body)

        if (!value.success) return res.status(400).json({
            error: value.error.format()
        })

        const { email, password, name } = value.data;

        const checkUserId: CheckUserWithIdType = {
            user_id: user_id
        }

        const checkUserEmail: CheckUserWithEmailType = {
            email: email
        }

        const result = await userFn.checkUserWithId(checkUserId);
        const existingEmail = await userFn.checkUserWithEmail(checkUserEmail);

        if (existingEmail) return res.status(400).json({
            error: "This email is not available. Try another one."
        })

        if (!result) return res.status(404).json({
            error: "User not found"
        })

        let defaultEmail: string = result.email;
        let defaultName: string = result.name;
        let defaultPassword: string = result.password;

        if (email && email !== defaultEmail) {

            defaultEmail = email


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

        }

        const newPassword = password && password !== defaultPassword ? await encryptedPassword(password) : defaultPassword;

        const newName =  name && name !== defaultName ? defaultName = name : defaultName 


        const user: UpdateUserType = {
            name: newName,
            email: defaultEmail,
            password: newPassword,
            user_id: user_id
        }



        const results = await userFn.updateUserInfo(user);

        delete results.password;
        delete results.isVerified;
        delete results.created_at;

        res.status(200).json({ 
            success: true,
            body: results
        });
    } catch (error) {
        next(error)
    }
}

export default updateUserController
