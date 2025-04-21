import express from "express";
import { ImageController } from "../controllers/upload_controller";
import  upload  from "../middlewares/uploadMiddleware";
import isAuthorized from "../middlewares/is_authorized"

const router = express.Router();


router.post('/task-image', [isAuthorized.check, upload.single("image")], ImageController.uploadImage);

export default router
