import express from "express";

const router = express.Router();

import TaskController from "../controllers/task_controller";
import isAuthorized from "../middlewares/is_authorized";
import createRateLimiter from "../middlewares/rateLimiterMiddleware";

const rateLimit = createRateLimiter(10, 5, "Too many attempts. Try again in 10 minutes.");

router.get('/all-tasks', [isAuthorized.check, rateLimit], TaskController.getAllTasks);
router.post('/create-task', [isAuthorized.check, rateLimit], TaskController.createNewTask);
router.patch('/update-task/:id', [isAuthorized.check, rateLimit], TaskController.updateUserTask);
router.delete('/delete-task/:id', [isAuthorized.check , rateLimit], TaskController.deleteUserTask);

export default router;
