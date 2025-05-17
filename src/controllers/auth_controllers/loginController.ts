require("cookie-parser")
import { loginSchema } from "../../schemas/userSchema";
import userFn from "../../utils/helper_functions/user-functions";
import { generateAccessTokenString, generateRefreshTokenString } from "../../utils/helper_functions/token-functions";
import { matchPasswords } from "../../utils/helper_functions/bcrypt-functions";
import CheckUserWithEmailType from "../../types/userTypes/CheckWithEmailType";
import { accessCookie, refreshCookie } from "../../global/variables";
import { Express } from "../../types/express/types";
import { RequestHandler } from "express";


const loginController: RequestHandler = async (req, res, next) => {
    try {

        const value = loginSchema.safeParse(req.body);

        if (!value.success) return res.status(400).json({
            error: value.error.format()
        })

        const { email, password } = value.data;

        const user: CheckUserWithEmailType = {
            email: email
        }

        let result = await userFn.checkUserWithEmail(user);

        if (!result) return res.status(404).json({ 
            error: "User not found. Please register or confirm your details" 
        })
        
        const { password: storedHashedPassword, user_id, name, is_verified} = result
 
        const match = await matchPasswords(password, storedHashedPassword)

        if (!match) return res.status(400).json({ 
            error: "Passwords don\'t match" 
        })

        const accessToken = generateAccessTokenString(user_id);
        const refreshToken = generateRefreshTokenString(user_id) 

        res.clearCookie('refresh_token', refreshCookie)

        res.clearCookie('access_token', accessCookie)

        res.cookie('refresh_token', refreshToken, refreshCookie)

        res.cookie('access_token', accessToken, accessCookie)

        res.status(200).json({
            success: true,
            message: "User login successful!",
            body: {
                user_id: user_id,
                name: name,
                email: result.email,
                is_verified: is_verified
            }
        })

    } catch (error) {
        next(error)
    }
}

export default loginController
