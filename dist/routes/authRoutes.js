"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const loginController_1 = __importDefault(require("../controllers/auth_controllers/loginController"));
const registerController_1 = __importDefault(require("../controllers/auth_controllers/registerController"));
const verifyUserController_1 = __importDefault(require("../controllers/auth_controllers/verifyUserController"));
const logoutController_1 = __importDefault(require("../controllers/auth_controllers/logoutController"));
const requestPasswordResetController_1 = __importDefault(require("../controllers/auth_controllers/requestPasswordResetController"));
const resetPasswordController_1 = __importDefault(require("../controllers/auth_controllers/resetPasswordController"));
const refreshAccessTokenController_1 = __importDefault(require("../controllers/auth_controllers/refreshAccessTokenController"));
const isAuthorized_1 = __importDefault(require("../middlewares/isAuthorized"));
const refreshTokenMiddleware_1 = __importDefault(require("../middlewares/refreshTokenMiddleware"));
router.post('/register', registerController_1.default);
router.get('/verify-email', verifyUserController_1.default);
router.post('/login', loginController_1.default);
router.post('/logout', isAuthorized_1.default, logoutController_1.default);
router.post('/forgot-password', requestPasswordResetController_1.default);
router.post('/reset-password', resetPasswordController_1.default);
router.post('/refresh-token', refreshTokenMiddleware_1.default, refreshAccessTokenController_1.default);
module.exports = router;
