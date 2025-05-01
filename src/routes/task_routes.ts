import express from "express";

const router = express.Router();


import isAuthorized from "../middlewares/is_authorized";
import getAllTasksController from "../controllers/task_controllers/getAllTasksController";
import getOneTaskController from "../controllers/task_controllers/getOneTaskController";
import createNewTaskController from "../controllers/task_controllers/createTaskController";
import updateUserTaskController from "../controllers/task_controllers/updateTaskController";
import deleteUserTaskController from "../controllers/task_controllers/deleteTaskController";
import upload from "../middlewares/uploadMiddleware";
import uploadTaskImageController from "../controllers/task_controllers/uploadTaskImageController";
import removeTaskImageController from "../controllers/task_controllers/removeTaskImageController";




router.get('/all-tasks', isAuthorized.check, getAllTasksController);
router.get('/task/:id', isAuthorized.check, getOneTaskController);
router.post('/create-task', isAuthorized.check, createNewTaskController);
router.patch('/update-task/:id', isAuthorized.check, updateUserTaskController);
router.delete('/delete-task/:id', isAuthorized.check, deleteUserTaskController);

router.post('/task/image/:id', [isAuthorized.check, upload.single("image")], uploadTaskImageController);
router.patch('/task/remove-image/:id', [isAuthorized.check], removeTaskImageController)
export default router;
