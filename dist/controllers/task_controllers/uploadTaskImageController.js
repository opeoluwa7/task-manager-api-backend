"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinaryConfig_1 = __importDefault(require("../../config/cloudinaryConfig"));
const task_functions_1 = __importDefault(require("../../utils/helper_functions/task-functions"));
const uploadTaskImageController = async (req, res, next) => {
    try {
        cloudinaryConfig_1.default.uploader.upload(req.file?.path, async (err, result) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "Error uploading image",
                });
            }
            const imgUrl = result.url;
            const imageUpload = await task_functions_1.default.uploadTaskImage(imgUrl);
            if (!imageUpload)
                return res.status(500).json({
                    success: false,
                    error: "Something went wrong"
                });
            const user_id = req.user?.user_id;
            const task_id = Number(req.params.id);
            const results = await task_functions_1.default.updateTaskImage(imgUrl, user_id, task_id);
            res.status(201).json({
                success: true,
                message: "File uploaded successfully!",
                image: results
            });
        });
    }
    catch (err) {
        next(err);
    }
};
exports.default = uploadTaskImageController;
