import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import AuthRoutes from "../routes/authRoutes";
import UserRoutes from "../routes/userRoutes";
import TaskRoutes from "../routes/taskRoutes";
import errorHandler from "../middlewares/errorHandler";
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


app.use("/api", rateLimit);
app.use("/api", AuthRoutes);
app.use("/api", UserRoutes);
app.use("/api", TaskRoutes);

app.use(errorHandler);
app.use(unknownRoute);
export default app
