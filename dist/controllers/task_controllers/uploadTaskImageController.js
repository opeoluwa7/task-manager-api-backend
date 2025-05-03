"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinaryConfig_1 = __importDefault(require("../../config/cloudinaryConfig"));
const task_functions_1 = __importDefault(require("../../utils/helper_functions/task-functions"));
const uploadTaskImageController = async (req, res, next) => {
    try {
        const file = req.file;
        if (!file)
            return res.status(400).json({
                success: false,
                error: "Please provide an image and make sure your key is image"
            });
        cloudinaryConfig_1.default.uploader.upload(file.path, async (err, result) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "Error uploading image",
                });
            }
            const imgUrl = result.url;
            const user_id = req.user?.user_id;
            const task_id = Number(req.params.id);
            const results = await task_functions_1.default.updateTaskImage(imgUrl, user_id, task_id);
            res.status(200).json({
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
