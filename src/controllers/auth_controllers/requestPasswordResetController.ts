import { forgotPasswordSchema } from "../../schemas/userSchema";
import userFn from "../../utils/helper_functions/user-functions";
import { storeTempInRedis } from "../../utils/helper_functions/redis-functions";
import { sendPasswordResetEmail} from "../../utils/helper_functions/email-functions";
import { generateResetTokenString } from "../../utils/helper_functions/token-functions";
import CheckUserWithEmailType from "../../types/userTypes/CheckWithEmailType";
import { Express } from "../../types/express/types";


const requestPasswordResetController = async({req, res, next}: Express) => {

    try {
        const value = forgotPasswordSchema.safeParse(req.body);

        if (!value.success) return res.status(400).json({
            error: value.error.format()
        })        

        const { email } = value.data;

        const user: CheckUserWithEmailType = {
            email: email

        }

        const result = await userFn.checkUserWithEmail(user);

        if (!result) return res.status(404).json({
            error: "User not found"
        });

        const user_id = result.user_id; 

        const resetToken = generateResetTokenString(user_id);

        await storeTempInRedis("reset:token", resetToken)

        await sendPasswordResetEmail(result.email);


        res.status(200).json({
            success: true,
            message: "Your password reset email has been sent to you."
        })

    } catch (error) {
        next(error)
    }
}


export default requestPasswordResetController
