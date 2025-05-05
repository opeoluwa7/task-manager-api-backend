"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taskSchema_1 = require("../../schemas/taskSchema");
const task_functions_1 = __importDefault(require("../../utils/helper_functions/task-functions"));
const updateUserTaskController = async (req, res, next) => {
    try {
        const value = taskSchema_1.updateTaskSchema.safeParse(req.body);
        if (!value.success) {
            return res.status(400).json({
                error: value.error.format()
            });
        }
        const { title, description, status, priority, deadline } = value.data;
        const user_id = req.user?.user_id;
        const task_id = Number(req.params.id);
        const results = await task_functions_1.default.updateTask(title, description, status, priority, deadline, user_id, task_id);
        const afterUpdateTask = await task_functions_1.default.getTaskById(user_id, task_id);
        if (!afterUpdateTask)
            return res.status(404).json({
                error: "Task not found in the database."
            });
        if (!results) {
            return res.status(500).json({
                error: "Error updating task. Something went wrong, try again"
            });
        }
        res.status(200).json({
            success: true,
            message: "Task updated succesfully!",
            updatedTask: results
        });
    }
    catch (error) {
        next(error);
    }
};
exports.default = updateUserTaskController;
