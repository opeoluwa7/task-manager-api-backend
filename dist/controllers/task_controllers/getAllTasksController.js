"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_functions_1 = __importDefault(require("../../utils/helper_functions/task-functions"));
const variables_1 = require("../../global/variables");
const getAllTasksController = async (express) => {
    try {
        const user_id = express.req.user?.user_id;
        let task = {
            user_id: user_id,
            limit: variables_1.variables.limit,
            offset: variables_1.variables.offset
        };
        const results = await task_functions_1.default.getAllTasks(task);
        if (!results)
            return express.res.status(500).json({
                error: "Internal Server Error"
            });
        if (results.length === 0) {
            return express.res.status(404).json({
                error: "No tasks found!"
            });
        }
        express.res.status(200).json({
            success: true,
            message: "All tasks",
            body: results
        });
    }
    catch (error) {
        express.next(error);
    }
};
exports.default = getAllTasksController;
