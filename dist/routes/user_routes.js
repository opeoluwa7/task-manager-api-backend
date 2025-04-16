"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const rateLimiterMiddleware_1 = __importDefault(require("../middlewares/rateLimiterMiddleware"));
const is_authorized_1 = __importDefault(require("../middlewares/is_authorized"));
const router = express_1.default.Router();
const rateLimit = (0, rateLimiterMiddleware_1.default)(10, 5, "Too many attempts. Try again in 10 minutes.");
const user_controller_1 = __importDefault(require("../controllers/user_controller"));
router.get('/find-user', [is_authorized_1.default.check, rateLimit], user_controller_1.default.findUser);
router.patch('/update-user', [is_authorized_1.default.check, rateLimit], user_controller_1.default.updateUser);
router.delete('/delete-user', [is_authorized_1.default.check, rateLimit], user_controller_1.default.deleteUser);
module.exports = router;
