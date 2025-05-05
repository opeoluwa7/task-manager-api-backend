import ms from "ms";
require("cookie-parser")
import { Request, Response, NextFunction } from "express";
import { loginSchema } from "../../schemas/userSchema";
import userFn from "../../utils/helper_functions/user-functions";
import { generateAccessTokenString, generateRefreshTokenString } from "../../utils/helper_functions/token-functions";
import { matchPasswords } from "../../utils/helper_functions/bcrypt-functions";


const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {

    const value = loginSchema.safeParse(req.body);

    if (!value.success) return res.status(400).json({
        error: value.error.format()
    })

    const { email, password } = value.data;

    const user = await userFn.checkUserWithEmail(email);

    if (!user) return res.status(404).json({ 
        error: "User not found. Please register or confirm your details" 
    })

    const storedHashedPassword = user.password;
    const user_id = user.user_id;
    const name = user.name;
    const isVerified = user.is_verified;

    
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
            email: user.email,
            isVerified: isVerified
        }
    })

    } catch (error) {
        next(error)
    }
}

export default loginController
