const router = require("express").Router();
import  upload  from "../middlewares/uploadMiddleware";
import isAuthorized from "../middlewares/is_authorized"
import { ImageController } from "../controllers/upload_controller";


router.post('/user/upload-image', [isAuthorized.check, upload.single("image")], ImageController.uploadImage);

router.get('/user/get-images', [isAuthorized.check], ImageController.getImages)

export default router
