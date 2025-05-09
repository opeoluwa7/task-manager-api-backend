"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taskSchema_1 = require("../../schemas/taskSchema");
const task_functions_1 = __importDefault(require("../../utils/helper_functions/task-functions"));
const createNewTaskController = async (req, res, next) => {
    try {
        const value = taskSchema_1.createTaskSchema.safeParse(req.body);
        if (!value.success)
            return res.status(400).json({
                error: value.error.format()
            });
        const data = value.data;
        const user_id = req.user?.user_id;
        const deadline = new Date(data.deadline);
        const task = {
            title: data.title,
            description: data.description,
            status: data.status,
            priority: data.priority,
            deadline: deadline,
            user_id: user_id
        };
        const results = await task_functions_1.default.createTask(task);
        if (!results)
            return res.status(500).json({
                error: "Error creating task"
            });
        res.status(201).json({
            success: true,
            message: "Task created successfully",
            body: results
        });
    }
    catch (error) {
        next(error);
    }
};
exports.default = createNewTaskController;
