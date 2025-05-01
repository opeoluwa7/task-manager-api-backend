import { NextFunction, Request, Response } from "express";
import db from "../../config/db_queries/task_queries";
import { FiltersType } from "../../types/utils/FiltersType";
import { queryTaskSchema } from "../../schemas/task_schema";



const getAllTasksController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const value = queryTaskSchema.safeParse(req.query);

        if (!value.success) return res.status(400).json({
            success: false,
            error: value.error.format()

        })

        const user_id: number = req.user?.user_id;

        const {status, priority} = value.data;

        const filters: FiltersType = {
            status,
            priority
        }

        let limit = 20;
        let offset = 0;

        const results = await db.getTasks(user_id, filters, limit, offset)

        if (!results) return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        })

        if (results.length === 0) {
            return res.status(404).json({
            success: false,
            error: "No tasks found!"
        });
        }

        res.status(200).json({
            success: true,
            message: "All tasks",
            tasks: results
        });
    } catch (error) {
    next(error)
    }
}

export default getAllTasksController
 
