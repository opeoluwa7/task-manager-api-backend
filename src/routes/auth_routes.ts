import express from "express";

const router = express.Router()

import AuthController from "../controllers/auth_controller";

import isAuthorized from "../middlewares/is_authorized";
import refreshTokenMiddlware from "../middlewares/refreshTokenMiddleware";


router.post('/register', AuthController.register);
router.get('/verify-email', AuthController.verifyUser);
router.post('/login', AuthController.login);
router.post('/logout', isAuthorized.check, AuthController.logout);
router.post('/forgot-password', AuthController.requestPasswordReset);
router.get('/reset-page', AuthController.resetPage);
router.post('/reset-password', AuthController.resetPassword);
router.post('/refresh-token', refreshTokenMiddlware, AuthController.refreshAccessToken)

export = router
