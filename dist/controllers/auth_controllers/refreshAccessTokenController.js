"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_functions_1 = require("../../utils/helper_functions/token-functions");
const ms_1 = __importDefault(require("ms"));
const refreshAccessTokenController = async (req, res, next) => {
    try {
        const token = req.cookies["refresh_token"];
        const refreshToken = (0, token_functions_1.verifyRefreshTokenString)(token);
        const user_id = refreshToken.user_id;
        const newAccessToken = (0, token_functions_1.generateAccessTokenString)(user_id);
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        res.cookie('access_token', newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: (0, ms_1.default)('10m')
        });
        return res.status(200).json({
            success: true,
            message: "Token refreshed successfully"
        });
    }
    catch (err) {
        next(err);
    }
};
exports.default = refreshAccessTokenController;
