"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const uploadMiddleware_1 = __importDefault(require("../middlewares/uploadMiddleware"));
const is_authorized_1 = __importDefault(require("../middlewares/is_authorized"));
const upload_controller_1 = require("../controllers/upload_controller");
router.post('/user/upload-image', [is_authorized_1.default.check, uploadMiddleware_1.default.single("image")], upload_controller_1.ImageController.uploadImage);
router.get('/user/get-images', [is_authorized_1.default.check], upload_controller_1.ImageController.getImages);
exports.default = router;
