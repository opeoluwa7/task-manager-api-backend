"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const isAuthorized_1 = __importDefault(require("../middlewares/isAuthorized"));
const findUserController_1 = __importDefault(require("../controllers/profile_controllers/findUserController"));
const updateUserController_1 = __importDefault(require("../controllers/profile_controllers/updateUserController"));
const deleteUserController_1 = __importDefault(require("../controllers/profile_controllers/deleteUserController"));
const router = express_1.default.Router();
router.get('/find-user', isAuthorized_1.default, findUserController_1.default);
router.patch('/update-user', isAuthorized_1.default, updateUserController_1.default);
router.delete('/delete-user', isAuthorized_1.default, deleteUserController_1.default);
module.exports = router;
