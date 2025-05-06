import { Request, Response, NextFunction } from "express";
import { getFromRedis } from "../../utils/helper_functions/redis-functions";
import { verifyVerificationTokenString } from "../../utils/helper_functions/token-functions";
import userFn from "../../utils/helper_functions/user-functions";



const verifyUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
           
        const token = await getFromRedis("verification:token");

        const verificationToken = verifyVerificationTokenString(token)

        if (!verificationToken) return res.status(400).json({
            error: "Invalid verification token. Please register"
        })

        const name = await getFromRedis("name");
        const email = await getFromRedis("email");
        const password = await getFromRedis("password");
        const isVerified: boolean = true; 

        const results = await userFn.createUser(name, email, password, isVerified)

        if (!results) return res.status(500).json({
            error: "Error creating user"
        })

        res.status(201).send("<h1> User verified successfully!. You can now login </h1>")
    } catch (error) {
        next(error)
    }
}

export default verifyUserController
