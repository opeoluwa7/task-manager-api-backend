"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_functions_1 = __importDefault(require("../../utils/helper_functions/task-functions"));
const getAllTasksController = async (req, res, next) => {
    try {
        const user_id = req.user?.user_id;
        const results = await task_functions_1.default.getAllTasks(user_id);
        if (!results)
            return res.status(500).json({
                success: false,
                error: "Internal Server Error"
            });
        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No tasks found!"
            });
        }
        res.status(200).json({
            success: true,
            message: "All tasks",
            tasks: results
        });
    }
    catch (error) {
        next(error);
    }
};
exports.default = getAllTasksController;
