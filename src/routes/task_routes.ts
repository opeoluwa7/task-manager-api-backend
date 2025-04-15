import express from "express";

const router = express.Router();

import TaskController from "../controllers/task_controller";
import isAuthorized from "../middlewares/is_authorized";

router.get('/all-tasks', isAuthorized.check, TaskController.getAllTasks);
router.post('/create-task', isAuthorized.check, TaskController.createNewTask);
router.patch('/update-task/:id', isAuthorized.check, TaskController.updateUserTask);
router.delete('/delete-task/:id', isAuthorized.check, TaskController.deleteUserTask);

export default router;
