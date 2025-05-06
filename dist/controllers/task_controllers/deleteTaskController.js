"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_functions_1 = __importDefault(require("../../utils/helper_functions/task-functions"));
const taskSchema_1 = require("../../schemas/taskSchema");
const deleteUserTaskController = async (req, res, next) => {
    try {
        const user_id = req.user?.user_id;
        const value = taskSchema_1.taskIdSchema.safeParse(req.params.id);
        if (!value.success)
            return res.status(400).json({
                error: value.error.format()
            });
        const { id } = value.data;
        const task_id = Number(id);
        if (!task_id)
            return res.status(404).json({
                error: "Task id not found"
            });
        if (isNaN(task_id))
            return res.status(400).json({
                error: "Task id must be a number"
            });
        let task = await task_functions_1.default.getTaskById(user_id, task_id);
        if (!task) {
            return res.status(404).json({
                error: "Task not found in the database!"
            });
        }
        const result = await task_functions_1.default.deleteTask(task.task_id);
        if (!result) {
            return res.status(500).json({
                error: "Error deleting task. Something went wrong"
            });
        }
        res.status(200).json({
            success: true,
            message: "Task deleted successfully!"
        });
    }
    catch (error) {
        next(error);
    }
};
exports.default = deleteUserTaskController;
