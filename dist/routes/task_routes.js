"use strict";
const router = require("express").Router();
const TaskController = require("../controllers/task_controller.js");
const isAuthenticated = require("../middlewares/is_authenticated.js");
router.get('/all-tasks', [isAuthenticated.check], TaskController.getAllTasks);
router.post('/create-task', [isAuthenticated.check], TaskController.createNewTask);
router.patch('/update-task/:id', [isAuthenticated.check], TaskController.updateUserTask);
router.delete('/delete-task/:id', [isAuthenticated.check], TaskController.deleteUserTask);
module.exports = router;
