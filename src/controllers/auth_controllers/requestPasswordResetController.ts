import { forgotPasswordSchema } from "../../schemas/userSchema";
import { Request, Response, NextFunction } from "express";
import userFn from "../../utils/helper_functions/user-functions";
import { storeTempInRedis } from "../../utils/helper_functions/redis-functions";
import { sendPasswordResetEmail} from "../../utils/helper_functions/email-functions";
import { generateResetTokenString } from "../../utils/helper_functions/token-functions";


const requestPasswordResetController = async(req: Request, res: Response, next: NextFunction) => {

    try {
        const value = forgotPasswordSchema.safeParse(req.body);

        if (!value.success) return res.status(400).json({
            success: false,
            error: value.error.format()
        })        

        const { email } = value.data;

        const user = await userFn.checkUserWithEmail(email);

        if (!user) return res.status(404).json({
            success: false,
            error: "User not found"
        });

        const user_id = user.user_id; 

        const resetToken = generateResetTokenString(user_id);

        await storeTempInRedis(resetToken, "reset-token")

        await sendPasswordResetEmail(user.email);


        res.status(201).json({
            success: true,
            message: "Your password reset email has been sent to you."
        })

    } catch (error) {
        next(error)
    }
}


export default requestPasswordResetController
