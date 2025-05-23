"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinaryConfig_1 = __importDefault(require("../../config/cloudinaryConfig"));
const task_functions_1 = __importDefault(require("../../utils/helper_functions/task-functions"));
const taskSchema_1 = require("../../schemas/taskSchema");
const uploadTaskImageController = async (req, res, next) => {
    try {
        const file = req.file;
        if (!file)
            return res.status(400).json({
                error: "Please provide an image path and make sure your key is image"
            });
        cloudinaryConfig_1.default.uploader.upload(file.path, async (err, result) => {
            if (err) {
                return res.status(400).json({
                    message: "Error uploading image",
                });
            }
            const imgUrl = result.url;
            const user_id = req.user?.user_id;
            const value = taskSchema_1.taskIdSchema.safeParse(req.params);
            if (!value.success)
                return res.status(400).json({
                    error: value.error.format()
                });
            const { id } = value.data;
            const task_id = Number(id);
            if (!task_id || isNaN(task_id))
                return res.status(400).json({
                    error: "Task id is required and must be a number"
                });
            const task = {
                user_id: user_id,
                task_id: task_id
            };
            const existingTask = await task_functions_1.default.getTaskById(task);
            if (!existingTask)
                return res.status(404).json({
                    error: "Task not found"
                });
            const image = {
                image_url: imgUrl,
                user_id: user_id,
                task_id: task_id
            };
            const results = await task_functions_1.default.updateTaskImage(image);
            res.status(201).json({
                success: true,
                message: "File uploaded successfully!",
                body: results
            });
        });
    }
    catch (err) {
        next(err);
    }
};
exports.default = uploadTaskImageController;
