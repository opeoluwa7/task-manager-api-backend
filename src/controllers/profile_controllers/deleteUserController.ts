import { blacklistToken } from "../../utils/helper_functions/redis-functions";
import userFn from "../../utils/helper_functions/user-functions";
import DeleteUserType from "../../types/userTypes/DeleteUserType";
import { accessCookie, refreshCookie } from "../../global/variables";
import { Express } from "../../types/express/types";


const deleteUserController = async ({req, res, next}: Express) => {
    try {
        const user_id: number = req.user?.user_id;

        const user: DeleteUserType = {
            user_id: user_id
        }

        const result = await userFn.deleteUserInfo(user);

        if (!result) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const accessToken = req.cookies['access_token'];
        const refreshToken = req.cookies['refresh_token'];

        await blacklistToken(accessToken);
        await blacklistToken(refreshToken)

        res.clearCookie("access_token", accessCookie);

        res.clearCookie("refresh_token", refreshCookie);

        res.status(200).json({ 
            success: true,
            message: "User deleted successfully" 
        });
    } catch (error) {
        next(error);
    }
};


export default deleteUserController
