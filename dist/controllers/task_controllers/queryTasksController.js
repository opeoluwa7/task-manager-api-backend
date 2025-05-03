"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taskSchema_1 = require("../../schemas/taskSchema");
const task_functions_1 = __importDefault(require("../../utils/helper_functions/task-functions"));
const queryTasksController = async (req, res, next) => {
    try {
        const query = req.query;
        if (Object.keys(query).length === 0)
            return res.status(400).json({
                success: false,
                error: "Query cannot be empty. At least one is required"
            });
        const value = taskSchema_1.queryTaskSchema.safeParse(query);
        if (!value.success)
            return res.status(400).json({
                success: false,
                error: value.error.format()
            });
        const { status, priority } = value.data;
        const filters = {
            status,
            priority
        };
        const user_id = req.user?.user_id;
        const result = await task_functions_1.default.queryAllTasks(user_id, filters);
        if (result.length === 0)
            return res.status(404).json({
                success: false,
                error: `No tasks found`
            });
        res.status(200).json({
            success: true,
            message: "All queried tasks"
        });
    }
    catch (error) {
        next(error);
    }
};
exports.default = queryTasksController;
