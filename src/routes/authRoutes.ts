import express from "express";

const router = express.Router()
import loginController from "../controllers/auth_controllers/loginController";
import registerController from "../controllers/auth_controllers/registerController";
import verifyUserController from "../controllers/auth_controllers/verifyUserController";
import logoutController from "../controllers/auth_controllers/logoutController";
import requestPasswordResetController from "../controllers/auth_controllers/requestPasswordResetController";
import resetPasswordController from "../controllers/auth_controllers/resetPasswordController";
import refreshAccessTokenController from "../controllers/auth_controllers/refreshAccessTokenController";

import isAuthorized from "../middlewares/isAuthorized";
import refreshTokenMiddlware from "../middlewares/refreshTokenMiddleware";


router.post('/register', registerController);
router.get('/verify-email', verifyUserController);
router.post('/login', loginController);
router.post('/logout', isAuthorized.check, logoutController);
router.post('/forgot-password', requestPasswordResetController);
router.post('/reset-password', resetPasswordController);
router.post('/refresh-token', refreshTokenMiddlware, refreshAccessTokenController)

export = router
