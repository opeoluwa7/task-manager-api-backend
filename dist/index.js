"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const env_1 = require("./config/env");
const auth_routes_1 = __importDefault(require("./routes/auth_routes"));
const user_routes_1 = __importDefault(require("./routes/user_routes"));
const task_routes_1 = __importDefault(require("./routes/task_routes"));
const error_handler_1 = __importDefault(require("./middlewares/error_handler"));
const uploads_route_1 = __importDefault(require("./routes/uploads_route"));
const PORT = env_1.env.PORT || 3000;
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: 'GET,PATCH,POST,DELETE',
    allowedHeaders: "Content-Type"
};
const app = (0, express_1.default)();
app.set('trust proxy', true);
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", uploads_route_1.default);
app.use("/api", auth_routes_1.default);
app.use("/api", user_routes_1.default);
app.use("/api", task_routes_1.default);
app.use(error_handler_1.default);
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
