"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_functions_1 = require("../../utils/helper_functions/token-functions");
const variables_1 = require("../../global/variables");
const refreshAccessTokenController = async (express) => {
    try {
        const token = express.req.cookies["refresh_token"];
        const refreshToken = (0, token_functions_1.verifyRefreshTokenString)(token);
        const user_id = refreshToken.user_id;
        const newAccessToken = (0, token_functions_1.generateAccessTokenString)(user_id);
        express.res.clearCookie('access_token', variables_1.accessCookie);
        express.res.cookie('access_token', newAccessToken, variables_1.accessCookie);
        return express.res.status(201).json({
            success: true,
            message: "Token refreshed successfully"
        });
    }
    catch (err) {
        express.next(err);
    }
};
exports.default = refreshAccessTokenController;
