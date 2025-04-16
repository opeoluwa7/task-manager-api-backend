"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const task_controller_1 = __importDefault(require("../controllers/task_controller"));
const is_authorized_1 = __importDefault(require("../middlewares/is_authorized"));
router.get('/all-tasks', is_authorized_1.default.check, task_controller_1.default.getAllTasks);
router.post('/create-task', is_authorized_1.default.check, task_controller_1.default.createNewTask);
router.patch('/update-task/:id', is_authorized_1.default.check, task_controller_1.default.updateUserTask);
router.delete('/delete-task/:id', is_authorized_1.default.check, task_controller_1.default.deleteUserTask);
exports.default = router;
