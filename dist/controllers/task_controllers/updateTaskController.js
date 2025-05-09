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
        const data = value.data;
        const user_id = req.user?.user_id;
        const id_value = taskSchema_1.taskIdSchema.safeParse(req.params);
        if (!id_value.success)
            return res.status(400).json({
                error: id_value.error.format()
            });
        const { id } = id_value.data;
        const task_id = Number(id);
        if (!task_id || isNaN(task_id))
            return res.status(400).json({
                error: "Task id is required and must be a number"
            });
        const task_deadline = new Date(data.deadline);
        const task = {
            user_id: user_id,
            task_id: task_id
        };
        const checkTask = await task_functions_1.default.getTaskById(task);
        if (!checkTask)
            return res.status(404).json({
                error: "Task not found in the database."
            });
        let updatedTask = {
            title: data.title,
            description: data.description,
            status: data.status,
            priority: data.priority,
            deadline: task_deadline,
            user_id: user_id,
            task_id: task_id
        };
        const results = await task_functions_1.default.updateTask(updatedTask);
        if (!results) {
            return res.status(500).json({
                error: "Error updating task. Something went wrong, try again"
            });
        }
        res.status(200).json({
            success: true,
            message: "Task updated succesfully!",
            body: results
        });
    }
    catch (error) {
        next(error);
    }
};
exports.default = updateUserTaskController;
