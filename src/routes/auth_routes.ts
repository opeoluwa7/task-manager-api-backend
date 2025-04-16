import express from "express";

const router = express.Router()

import AuthController from "../controllers/auth_controller";

import createRateLimiter from "../middlewares/rateLimiterMiddleware";
import isAuthorized from "../middlewares/is_authorized";
import refreshTokenMiddlware from "../middlewares/refreshTokenMiddleware";

const rateLimit = createRateLimiter(10, 5, "Too many attempts. Try again in 10 minutes.");


router.post('/register', rateLimit, AuthController.register);
router.post('/login', rateLimit, AuthController.login);
router.post('/logout', [rateLimit, isAuthorized.check], AuthController.logout);
router.post('/forgot-password', rateLimit, AuthController.requestPasswordReset);
router.post('/reset-password', rateLimit, AuthController.resetPassword);
router.post('/refresh-token', [rateLimit, refreshTokenMiddlware], AuthController.refreshAccessToken)

export = router
