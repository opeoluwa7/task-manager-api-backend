"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_functions_1 = __importDefault(require("../../utils/helper_functions/user-functions"));
const findUserController = async ({ req, res, next }) => {
    try {
        const user_id = req.user?.user_id;
        const user = {
            user_id: user_id
        };
        const result = await user_functions_1.default.checkUserWithId(user);
        if (!result)
            return res.status(404).json({
                error: "User not found"
            });
        res.status(200).json({
            success: true,
            body: {
                user_id: result.user_id,
                name: result.name,
                email: result.email
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.default = findUserController;
