import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import AuthRoutes from "../routes/auth_routes";
import UserRoutes from "../routes/user_routes";
import TaskRoutes from "../routes/task_routes";
import errorHandler from "../middlewares/error_handler";
import createRateLimiter from "../middlewares/rateLimiterMiddleware";
import unknownRoute from "../middlewares/unknownRouteMiddleware";

const rateLimit = createRateLimiter(60, 1000, "The server has received too many requests from this IP. Try again in one hour.")

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

app.use(unknownRoute);
app.use("/api", rateLimit);
app.use("/api", AuthRoutes);
app.use("/api", UserRoutes);
app.use("/api", TaskRoutes);

app.use(errorHandler);

app.use((req: Request, res: Response) => {
                res.status(404).json({
                                success: false,
                                error: "Route not found"
                })
})

export default app
