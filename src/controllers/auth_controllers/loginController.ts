import ms from "ms";
require("cookie-parser")
import { Request, Response, NextFunction } from "express";
import { loginSchema } from "../../schemas/userSchema";
import userFn from "../../utils/helper_functions/user-functions";
import { generateAccessTokenString, generateRefreshTokenString } from "../../utils/helper_functions/token-functions";
import { matchPasswords } from "../../utils/helper_functions/bcrypt-functions";
import CheckUserWithEmailType from "../../types/userTypes/CheckWithEmailType";


const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const value = loginSchema.safeParse(req.body);

        if (!value.success) return res.status(400).json({
            error: value.error.format()
        })

        const { email, password } = value.data;

        const user: CheckUserWithEmailType = {
            email: email
        }

        const result = await userFn.checkUserWithEmail(user);

        if (!result) return res.status(404).json({ 
            error: "User not found. Please register or confirm your details" 
        })

        const storedHashedPassword = result.password;
        const user_id = result.user_id;
        const name = result.name;
        const isVerified = result.is_verified;

        
        const match = await matchPasswords(password, storedHashedPassword)

        if (!match) return res.status(400).json({ 
            error: "Passwords don\'t match" 
        })

        const accessToken = generateAccessTokenString(user_id);
        const refreshToken = generateRefreshTokenString(user_id) 

        res.clearCookie('refresh_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/api/refresh-token'
        })

        res.clearCookie('access_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: "/api/refresh-token",
            maxAge: ms('3d')
        })

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: ms('10m')
        })

        res.status(200).json({
            success: true,
            message: "User login successful!",
            body: {
                user_id: user_id,
                name: name,
                email: result.email,
                isVerified: isVerified
            }
        })

    } catch (error) {
        next(error)
    }
}

export default loginController
