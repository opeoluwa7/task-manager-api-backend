"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = __importDefault(require("../routes/auth_routes"));
const user_routes_1 = __importDefault(require("../routes/user_routes"));
const task_routes_1 = __importDefault(require("../routes/task_routes"));
const error_handler_1 = __importDefault(require("../middlewares/error_handler"));
const rateLimiterMiddleware_1 = __importDefault(require("../middlewares/rateLimiterMiddleware"));
const unknownRouteMiddleware_1 = __importDefault(require("../middlewares/unknownRouteMiddleware"));
const rateLimit = (0, rateLimiterMiddleware_1.default)(60, 1000, "The server has received too many requests from this IP. Try again in one hour.");
const corsOptions = {
    origin: ['https://task-manager-app-frontend-blue.vercel.app', 'http://localhost:5173'],
    credentials: true,
    methods: 'GET,PATCH,POST,DELETE',
    allowedHeaders: "Content-Type"
};
const app = (0, express_1.default)();
app.set('trust proxy', 1);
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(unknownRouteMiddleware_1.default);
app.use("/api", rateLimit);
app.use("/api", auth_routes_1.default);
app.use("/api", user_routes_1.default);
app.use("/api", task_routes_1.default);
app.use(error_handler_1.default);
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: "Route not found"
    });
});
exports.default = app;
