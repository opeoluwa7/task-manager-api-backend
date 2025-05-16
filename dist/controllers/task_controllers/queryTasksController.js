"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taskSchema_1 = require("../../schemas/taskSchema");
const task_functions_1 = __importDefault(require("../../utils/helper_functions/task-functions"));
const variables_1 = require("../../global/variables");
const queryTasksController = async (express) => {
    try {
        const query = express.req.query;
        const queryArray = Object.entries(query);
        if (queryArray.length === 0)
            return express.res.status(404).json({
                error: "Query cannot be empty. At least one is required"
            });
        const value = taskSchema_1.queryTaskSchema.safeParse(query);
        if (!value.success)
            return express.res.status(400).json({
                error: value.error.format()
            });
        const { status, priority } = value.data;
        const filters = {
            status,
            priority
        };
        const user_id = express.req.user?.user_id;
        const task = {
            user_id: user_id,
            filters: filters,
            limit: variables_1.variables.limit,
            offset: variables_1.variables.offset
        };
        const result = await task_functions_1.default.queryAllTasks(task);
        if (result.length === 0)
            return express.res.status(404).json({
                error: `No tasks found`
            });
        express.res.status(200).json({
            success: true,
            message: "All queried tasks",
            body: result
        });
    }
    catch (error) {
        express.next(error);
    }
};
exports.default = queryTasksController;
