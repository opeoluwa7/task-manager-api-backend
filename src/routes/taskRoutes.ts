import express from "express";

const router = express.Router();


import isAuthorized from "../middlewares/isAuthorized";
import getAllTasksController from "../controllers/task_controllers/getAllTasksController";
import getOneTaskController from "../controllers/task_controllers/getOneTaskController";
import createNewTaskController from "../controllers/task_controllers/createTaskController";
import updateUserTaskController from "../controllers/task_controllers/updateTaskController";
import deleteUserTaskController from "../controllers/task_controllers/deleteTaskController";
import upload from "../middlewares/uploadMiddleware";
import uploadTaskImageController from "../controllers/task_controllers/uploadTaskImageController";
import removeTaskImageController from "../controllers/task_controllers/removeTaskImageController";
import queryTasksController from "../controllers/task_controllers/queryTasksController";




router.get('/all-tasks', isAuthorized, getAllTasksController);
router.get('/query-tasks', isAuthorized, queryTasksController);
router.get('/task/:id', isAuthorized, getOneTaskController);
router.post('/create-task', isAuthorized, createNewTaskController);
router.patch('/update-task/:id', isAuthorized, updateUserTaskController);
router.delete('/delete-task/:id', isAuthorized, deleteUserTaskController);

router.post('/task/image/:id', [isAuthorized, upload.single("image")], uploadTaskImageController);
router.patch('/task/remove-image/:id', isAuthorized, removeTaskImageController)
export default router;
