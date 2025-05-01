
import { registerSchema } from "../../schemas/user_schema";
import { storeTempInRedis } from "../../utils/helper_functions/redis-functions";
import { Request, Response, NextFunction } from "express";
import { generateVerificationTokenString } from "../../utils/helper_functions/token-functions";
import userFn from "../../utils/helper_functions/user-functions";
import { encryptedPassword } from "../../utils/helper_functions/bcrypt-functions";
import { sendVerificationEmail } from "../../utils/helper_functions/email-functions";


const registerController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const value = registerSchema.safeParse(req.body);

        if (!value.success) {
            return res.status(400).json({
            success: false,
            error: value.error.format()
            })
        }

        const { name, email, password } = value.data;

        const existingUser = await userFn.checkUserWithEmail(email);

        if (existingUser) return res.status(400).json({
            success: false,
            error: "User with this email already exists"
        })

        const hashedPassword = await encryptedPassword(password);

        const verificationToken = generateVerificationTokenString(email);


        await storeTempInRedis("name", name);
        await storeTempInRedis("email", email);
        await storeTempInRedis("password", hashedPassword);
        await storeTempInRedis("verification-token", verificationToken);

        await sendVerificationEmail(email);

        res.status(200).json({
            success: true,
            message: "An Email Verification link has been sent to you. Please verify"
        })

    } catch (error) {
        next(error)
    }
}

export default registerController
