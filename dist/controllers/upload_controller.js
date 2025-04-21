"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
const uploadQueries_1 = __importDefault(require("../config/db_queries/uploadQueries"));
const cloudinaryConfig_1 = __importDefault(require("../config/cloudinaryConfig"));
const uploadImage = async (req, res, next) => {
    try {
        cloudinaryConfig_1.default.uploader.upload(req.file?.path, async (err, result) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "Error uploading image",
                    error: err.message
                });
            }
            console.log(result);
            const imgUrl = result.url;
            const imageUpload = await uploadQueries_1.default.uploadImageUrl(imgUrl);
            if (!imageUpload)
                return res.status(400).json({
                    success: false,
                    error: "Something went wrong"
                });
            const user_id = req.user?.user_id;
            const task_id = Number(req.params.id);
            const results = await uploadQueries_1.default.updateImageUrl(imgUrl, user_id, task_id);
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
const removeImage = async (req, res, next) => {
    try {
        const user_id = req.user?.user_id;
        const task_id = Number(req.params.id);
        const imageUrl = await uploadQueries_1.default.getImageUrl(user_id, task_id);
        const results = await uploadQueries_1.default.removeImageUrl(imageUrl, user_id, task_id);
        if (!results)
            return res.status(404).json({
                success: false,
                error: "Image not found"
            });
        res.status(200).json({
            success: true,
            message: "Image removed successfully!"
        });
    }
    catch (error) {
        next(error);
    }
};
exports.ImageController = {
    uploadImage,
    removeImage
};
