import { NextFunction, Request, Response } from "express";
import userFn from "../../utils/helper_functions/user-functions";




const findUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id: number = req.user?.user_id;
        const user = await userFn.checkUserWithId(user_id);

        if (!user) return res.status(404).json({
            success: false,
            error: "User not found"
        })

        res.status(200).json({
            success: true,
            user: {
                user_id: user.user_id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        next(error)
    }
}

export default findUserController
