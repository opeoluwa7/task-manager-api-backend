"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_functions_1 = __importDefault(require("../../utils/helper_functions/user-functions"));
const findUserController = async (req, res, next) => {
    try {
        const user_id = req.user?.user_id;
        const user = await user_functions_1.default.checkUserWithId(user_id);
        if (!user)
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        res.status(200).json({
            success: true,
            user: {
                user_id: user.user_id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.default = findUserController;
