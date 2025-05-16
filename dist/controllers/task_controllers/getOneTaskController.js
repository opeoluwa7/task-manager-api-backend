"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_functions_1 = __importDefault(require("../../utils/helper_functions/task-functions"));
const taskSchema_1 = require("../../schemas/taskSchema");
const getOneTaskController = async (express) => {
    try {
        const user_id = express.req.user?.user_id;
        const value = taskSchema_1.taskIdSchema.safeParse(express.req.params);
        if (!value.success)
            return express.res.status(400).json({
                error: value.error.format()
            });
        const { id } = value.data;
        const task_id = Number(id);
        if (!task_id || isNaN(task_id))
            return express.res.status(400).json({
                error: "Task id is required and must be a number"
            });
        const task = {
            user_id: user_id,
            task_id: task_id
        };
        const results = await task_functions_1.default.getTaskById(task);
        if (!results)
            return express.res.status(404).json({
                error: "Task not found"
            });
        express.res.status(200).json({
            success: true,
            message: "Task",
            body: results
        });
    }
    catch (error) {
        express.next(error);
    }
};
exports.default = getOneTaskController;
