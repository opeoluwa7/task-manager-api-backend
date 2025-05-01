import express from "express";

import isAuthorized from "../middlewares/isAuthorized";
import findUserController from "../controllers/profile_controllers/findUserController";
import updateUserController from "../controllers/profile_controllers/updateUserController";
import deleteUserController from "../controllers/profile_controllers/deleteUserController";

const router = express.Router();





router.get('/find-user', isAuthorized.check, findUserController);

router.patch('/update-user', isAuthorized.check, updateUserController);

router.delete('/delete-user', isAuthorized.check, deleteUserController)

export = router
