"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const is_authorized_1 = __importDefault(require("../middlewares/is_authorized"));
const router = express_1.default.Router();
const user_controller_1 = __importDefault(require("../controllers/user_controller"));
router.get('/find-user', is_authorized_1.default.check, user_controller_1.default.findUser);
router.patch('/update-user', is_authorized_1.default.check, user_controller_1.default.updateUser);
router.delete('/delete-user', is_authorized_1.default.check, user_controller_1.default.deleteUser);
module.exports = router;
