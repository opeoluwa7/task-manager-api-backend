"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_controller_1 = require("../controllers/upload_controller");
const uploadMiddleware_1 = __importDefault(require("../middlewares/uploadMiddleware"));
const is_authorized_1 = __importDefault(require("../middlewares/is_authorized"));
const router = express_1.default.Router();
router.post('/task/image/:id', [is_authorized_1.default.check, uploadMiddleware_1.default.single("image")], upload_controller_1.ImageController.uploadImage);
router.patch('/task/remove-image/:id', [is_authorized_1.default.check], upload_controller_1.ImageController.removeImage);
exports.default = router;
