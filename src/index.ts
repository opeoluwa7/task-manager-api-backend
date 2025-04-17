import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env }  from "./config/env";
import AuthRoutes from "./routes/auth_routes";
import UserRoutes from "./routes/user_routes";
import TaskRoutes from "./routes/task_routes";
import errorHandler from "./middlewares/error_handler";
import ImageRoutes from "./routes/uploads_route";
import createRateLimiter from "./middlewares/rateLimiterMiddleware";

const rateLimit = createRateLimiter(60, 1000, "The server has received too many requests from this IP. Try again in one hour.")


const PORT = env.PORT || 3000;

const corsOptions = {
        origin: ['https://task-manager-app-frontend-blue.vercel.app', 'http://localhost:5173'],
        credentials: true,
        methods: 'GET,PATCH,POST,DELETE',
        allowedHeaders: "Content-Type"

}

const app = express();

app.set('trust proxy', 1);

app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", rateLimit);
app.use("/api", ImageRoutes)
app.use("/api", AuthRoutes);
app.use("/api", UserRoutes);
app.use("/api", TaskRoutes);

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}.........Running..........`))
