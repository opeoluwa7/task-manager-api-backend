"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_functions_1 = __importDefault(require("../../utils/helper_functions/task-functions"));
const getOneTaskController = async (req, res, next) => {
    try {
        const user_id = req.user?.user_id;
        const task_id = Number(req.params.id);
        const results = await task_functions_1.default.getTaskById(user_id, task_id);
        if (!results)
            return res.status(404).json({
                error: "Task not found"
            });
        res.status(200).json({
            success: true,
            message: "Task",
            body: results
        });
    }
    catch (error) {
        next(error);
    }
};
exports.default = getOneTaskController;
