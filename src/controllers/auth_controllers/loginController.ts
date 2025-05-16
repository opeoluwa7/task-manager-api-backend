require("cookie-parser")
import { loginSchema } from "../../schemas/userSchema";
import userFn from "../../utils/helper_functions/user-functions";
import { generateAccessTokenString, generateRefreshTokenString } from "../../utils/helper_functions/token-functions";
import { matchPasswords } from "../../utils/helper_functions/bcrypt-functions";
import CheckUserWithEmailType from "../../types/userTypes/CheckWithEmailType";
import { accessCookie, refreshCookie } from "../../global/variables";
import { Express } from "../../types/express/types";


const loginController = async (express: Express) => {
    try {

        const value = loginSchema.safeParse(express.req.body);

        if (!value.success) return express.res.status(400).json({
            error: value.error.format()
        })

        const { email, password } = value.data;

        const user: CheckUserWithEmailType = {
            email: email
        }

        let result = await userFn.checkUserWithEmail(user);

        if (!result) return express.res.status(404).json({ 
            error: "User not found. Please register or confirm your details" 
        })
        
        const { password: storedHashedPassword, user_id, name, is_verified} = result
 
        const match = await matchPasswords(password, storedHashedPassword)

        if (!match) return express.res.status(400).json({ 
            error: "Passwords don\'t match" 
        })

        const accessToken = generateAccessTokenString(user_id);
        const refreshToken = generateRefreshTokenString(user_id) 

        express.res.clearCookie('refresh_token', refreshCookie)

        express.res.clearCookie('access_token', accessCookie)

        express.res.cookie('refresh_token', refreshToken, refreshCookie)

        express.res.cookie('access_token', accessToken, accessCookie)

        express.res.status(200).json({
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
        express.next(error)
    }
}

export default loginController
