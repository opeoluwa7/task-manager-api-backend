import express from "express";
import { ImageController } from "../controllers/upload_controller";
import  upload  from "../middlewares/uploadMiddleware";
import isAuthorized from "../middlewares/is_authorized"

const router = express.Router();


router.post('/user/upload-image', [isAuthorized.check, upload.single("image")], ImageController.uploadImage);

router.get('/user/get-images', [isAuthorized.check], ImageController.getImages)

export default router
