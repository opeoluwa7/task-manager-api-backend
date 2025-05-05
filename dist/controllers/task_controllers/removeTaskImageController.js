"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_functions_1 = __importDefault(require("../../utils/helper_functions/task-functions"));
const removeTaskImageController = async (req, res, next) => {
    try {
        const user_id = req.user?.user_id;
        const task_id = Number(req.params.id);
        await task_functions_1.default.removeTaskImage(user_id, task_id);
        const task = await task_functions_1.default.getTaskById(user_id, task_id);
        if (task.image_url !== null)
            return res.status(404).json({
                error: "Image not found"
            });
        res.status(200).json({
            success: true,
            message: "Image removed successfully!",
            task: task
        });
    }
    catch (error) {
        next(error);
    }
};
exports.default = removeTaskImageController;
