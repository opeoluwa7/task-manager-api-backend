"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_controller_1 = __importDefault(require("../controllers/auth_controller"));
const rateLimiterMiddleware_1 = __importDefault(require("../middlewares/rateLimiterMiddleware"));
const is_authorized_1 = __importDefault(require("../middlewares/is_authorized"));
const refreshTokenMiddleware_1 = __importDefault(require("../middlewares/refreshTokenMiddleware"));
const rateLimit = (0, rateLimiterMiddleware_1.default)(10, 5, "Too many attempts. Try again in 10 minutes.");
router.post('/register', rateLimit, auth_controller_1.default.register);
router.post('/login', rateLimit, auth_controller_1.default.login);
router.post('/logout', [rateLimit, is_authorized_1.default.check], auth_controller_1.default.logout);
router.post('/forgot-password', rateLimit, auth_controller_1.default.requestPasswordReset);
router.post('/reset-password', rateLimit, auth_controller_1.default.resetPassword);
router.post('/refresh-token', refreshTokenMiddleware_1.default, auth_controller_1.default.refreshAccessToken);
module.exports = router;
