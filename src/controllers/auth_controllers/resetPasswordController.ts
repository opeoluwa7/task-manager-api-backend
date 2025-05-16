import { resetPasswordSchema } from "../../schemas/userSchema";
import { matchPasswords, encryptedPassword } from "../../utils/helper_functions/bcrypt-functions";
import userFn from "../../utils/helper_functions/user-functions"; 
import { verifyResetTokenString } from "../../utils/helper_functions/token-functions";
import { getFromRedis } from "../../utils/helper_functions/redis-functions";
import { Request, Response, NextFunction } from "express";
import UpdateUserType from "../../types/userTypes/UpdateUserType";




const resetPasswordController = async(req: Request, res: Response, next: NextFunction) => {
    try {

        const value = resetPasswordSchema.safeParse(req.body);

        if (!value.success) return res.status(400).json({
            error: value.error.format()
        })

        const { password } = value.data;

        const resetToken = await getFromRedis("reset:token");

        if (!resetToken) return res.status(401).json({
            error: "No reset token provided. Go back to forgot password"
        })

        const verified = verifyResetTokenString(resetToken);

        if (!verified) return res.status(401).json({
            error: "Invalid reset token. go back to forgot password"
        })

        const { name, email, password: storedHashedPassword, user_id } = await userFn.checkUserWithId(verified.user_id);

        const match = await matchPasswords(password, storedHashedPassword);

        if (match) return res.status(400).json({
            error: "Passwords must not match. change it for better security."
        })

        const hashedPassword = await encryptedPassword(password);

        const updatePassword: UpdateUserType = {
            name: name,
            email: email,
            password: hashedPassword,
            user_id: user_id
        }

        const results = await userFn.updateUserInfo(updatePassword);

        if (!results) return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        })


        res.status(200).json({
            success: true,
            message: "Password reset successful!"
        }) 
    } catch (error) {
        next(error)
    }
}

export default resetPasswordController
