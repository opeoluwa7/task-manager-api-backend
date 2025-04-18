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
                    message: "Error uploading image"
                });
            }
            console.log(result);
            const imgUrl = result.url;
            const user_id = req.user?.user_id;
            const imageUpload = await uploadQueries_1.default.uploadImageUrl(imgUrl, user_id);
            if (!imageUpload)
                return res.status(400).json({
                    success: false,
                    error: "Image upload failed. Are you logged in?"
                });
            res.status(201).json({
                success: true,
                message: "File uploaded successfully!",
                image: imageUpload
            });
        });
    }
    catch (err) {
        next(err);
    }
};
const getImages = async (req, res, next) => {
    try {
        const user_id = req.user?.user_id;
        const result = await uploadQueries_1.default.getImages(user_id);
        if (result?.length === 0)
            return res.status(404).json({
                success: false,
                error: "No images found",
            });
        res.status(200).json({
            success: true,
            images: result,
            mesage: "Successful!"
        });
    }
    catch (err) {
        next(err);
    }
};
exports.ImageController = {
    uploadImage,
    getImages
};
