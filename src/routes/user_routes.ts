import express from "express";

import isAuthorized from "../middlewares/is_authorized";

const router = express.Router();


import UserController from "../controllers/user_controller";


router.get('/find-user', isAuthorized.check, UserController.findUser);

router.patch('/update-user', isAuthorized.check, UserController.updateUser);

router.delete('/delete-user', isAuthorized.check, UserController.deleteUser)

export = router
