"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_queries_1 = __importDefault(require("../../config/db_queries/task_queries"));
const task_schema_1 = require("../../schemas/task_schema");
const getAllTasksController = async (req, res, next) => {
    try {
        const value = task_schema_1.queryTaskSchema.safeParse(req.query);
        if (!value.success)
            return res.status(400).json({
                success: false,
                error: value.error.format()
            });
        const user_id = req.user?.user_id;
        const { status, priority } = value.data;
        const filters = {
            status,
            priority
        };
        let limit = 20;
        let offset = 0;
        const results = await task_queries_1.default.getTasks(user_id, filters, limit, offset);
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
