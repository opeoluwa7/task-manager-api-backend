"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_controller_1 = __importDefault(require("../controllers/auth_controller"));
const is_authorized_1 = __importDefault(require("../middlewares/is_authorized"));
const refreshTokenMiddleware_1 = __importDefault(require("../middlewares/refreshTokenMiddleware"));
router.post('/register', auth_controller_1.default.register);
router.post('/login', auth_controller_1.default.login);
router.post('/logout', is_authorized_1.default.check, auth_controller_1.default.logout);
router.post('/forgot-password', auth_controller_1.default.requestPasswordReset);
router.post('/reset-password', auth_controller_1.default.resetPassword);
router.post('/refresh-token', refreshTokenMiddleware_1.default, auth_controller_1.default.refreshAccessToken);
module.exports = router;
