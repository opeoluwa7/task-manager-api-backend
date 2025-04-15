"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploadQueries_js_1 = __importDefault(require("../config/db/uploadQueries.js"));
const upload = require("../middlewares/uploadMiddleware.js");
const isAuthenticated = require("../middlewares/is_authenticated.js");
const cloudinary = require("../config/cloudinaryConfig.js");
const router = express_1.default.Router();
router.post('/user/upload-image', [isAuthenticated.check, upload.single("image")], async (req, res, next) => {
    try {
        cloudinary.uploader.upload(req.file.path, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Error uploading image"
                });
            }
            res.status(201).json({
                success: true,
                message: "File uploaded successfully",
                image: result
            });
        });
    }
    catch (error) {
        next(error);
    }
});
router.get('/user/get-image', [isAuthenticated.check], async (req, res, next) => {
    try {
        const user_id = req.user.user_id;
        if (!user_id)
            return res.status(401).json({
                success: false,
                error: "No Auth Headers found. please log in again."
            });
        const result = await uploadQueries_js_1.default.getImages(user_id);
        if (!result)
            return res.status(404).json({
                success: false,
                error: "No images found"
            });
        res.status(200).json({
            success: true,
            message: "All images",
            images: result
        });
    }
    catch (error) {
        next(error);
    }
});
module.exports = router;
