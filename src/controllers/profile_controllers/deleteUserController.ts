import { blacklistToken } from "../../utils/helper_functions/redis-functions";
import userFn from "../../utils/helper_functions/user-functions";
import DeleteUserType from "../../types/userTypes/DeleteUserType";
import { accessCookie, refreshCookie } from "../../global/variables";
import { Express } from "../../types/express/types";


const deleteUserController = async (express: Express) => {
    try {
        const user_id: number = express.req.user?.user_id;

        const user: DeleteUserType = {
            user_id: user_id
        }

        const result = await userFn.deleteUserInfo(user);

        if (!result) {
            return express.res.status(404).json({
                message: "User not found"
            })
        }

        const accessToken = express.req.cookies['access_token'];
        const refreshToken = express.req.cookies['refresh_token'];

        await blacklistToken(accessToken);
        await blacklistToken(refreshToken)

        express.res.clearCookie("access_token", accessCookie);

        express.res.clearCookie("refresh_token", refreshCookie);

        express.res.status(200).json({ 
            success: true,
            message: "User deleted successfully" 
        });
    } catch (error) {
        express.next(error);
    }
};


export default deleteUserController
