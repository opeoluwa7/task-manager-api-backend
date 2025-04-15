const router = require("express").Router();

import createRateLimiter from "../middlewares/rateLimiterMiddleware";

const rateLimit = createRateLimiter(10, 5, "Too many attempts. Try again in 10 minutes.");
import isAuthorized from "../middlewares/is_authorized"

import UserController from "../controllers/user_controller";


router.get('/find-user', [isAuthorized.check], UserController.findUser);

router.patch('/update-user', [isAuthorized.check, rateLimit], UserController.updateUser);

router.delete('/delete-user', [isAuthorized.check], UserController.deleteUser)

export = router
