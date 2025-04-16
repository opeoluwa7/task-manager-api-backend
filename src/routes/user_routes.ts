import express from "express";
import createRateLimiter from "../middlewares/rateLimiterMiddleware";
import isAuthorized from "../middlewares/is_authorized";

const router = express.Router();
const rateLimit = createRateLimiter(10, 5, "Too many attempts. Try again in 10 minutes.");

import UserController from "../controllers/user_controller";


router.get('/find-user', [isAuthorized.check, rateLimit], UserController.findUser);

router.patch('/update-user', [isAuthorized.check, rateLimit], UserController.updateUser);

router.delete('/delete-user', [isAuthorized.check, rateLimit], UserController.deleteUser)

export = router
