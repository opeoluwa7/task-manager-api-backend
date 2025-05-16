import userFn from "../../utils/helper_functions/user-functions";
import CheckUserWithIdType from "../../types/userTypes/CheckUserWithIdType";
import { Express } from "../../types/express/types";



const findUserController = async (express: Express) => {
    try {
        const user_id: number = express.req.user?.user_id;

        const user: CheckUserWithIdType = {
            user_id: user_id
        }

        const result = await userFn.checkUserWithId(user);

        if (!result) return express.res.status(404).json({
            error: "User not found"
        })

        express.res.status(200).json({
            success: true,
            body: {
                user_id: result.user_id,
                name: result.name,
                email: result.email
            }
        })
    } catch (error) {
        express.next(error)
    }
}

export default findUserController
